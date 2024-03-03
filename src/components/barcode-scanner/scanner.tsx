import { FC, useCallback, useLayoutEffect } from "react";
import Quagga, {
	QuaggaJSCodeReader,
	QuaggaJSConfigObject,
	QuaggaJSResultObject,
	QuaggaJSResultObject_CodeResult,
} from "@ericblade/quagga2";

function getMedian(arr: number[]) {
	const newArr = [...arr]; // copy the array before sorting, otherwise it mutates the array passed in, which is generally undesireable
	newArr.sort((a, b) => a - b);
	const half = Math.floor(newArr.length / 2);
	if (newArr.length % 2 === 1) {
		return newArr[half];
	}
	return (newArr[half - 1] + newArr[half]) / 2;
}

function getMedianOfCodeErrors(
	decodedCodes: QuaggaJSResultObject_CodeResult["decodedCodes"],
) {
	const errors = decodedCodes.flatMap((x) => x.error || 0);
	const medianOfErrors = getMedian(errors);
	return medianOfErrors;
}

const defaultConstraints = {
	width: 640,
	height: 480,
};

const defaultLocatorSettings = {
	patchSize: "medium",
	halfSample: true,
	willReadFrequently: true,
};

export const Scanner: FC<{
	scannerRef: React.RefObject<HTMLElement>;
	cameraId: ConstrainDOMString;
	onDetected?: (code: string) => void;
	onScannerReady?: () => void;
	facingMode?: ConstrainDOMString;
	locator?: QuaggaJSConfigObject["locator"];
	constraints?: MediaTrackConstraints;
	locate?: boolean;
	readers: QuaggaJSCodeReader[];
}> = ({
	onDetected,
	scannerRef,
	onScannerReady,
	cameraId,
	facingMode,
	constraints = defaultConstraints,
	locator = defaultLocatorSettings,
	locate = true,
	readers,
}) => {
		const errorCheck = useCallback(
			(result: QuaggaJSResultObject) => {
				if (!onDetected) {
					return;
				}
				const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
				// if Quagga is at least 75% certain that it read correctly, then accept the code.
				if (err < 0.25) {
					onDetected(result.codeResult.code!);
				}
			},
			[onDetected],
		);

		const handleProcessed = (result: QuaggaJSResultObject) => {
			const drawingCtx = Quagga.canvas.ctx.overlay;
			const drawingCanvas = Quagga.canvas.dom.overlay;
			drawingCtx.font = "24px Arial";
			drawingCtx.fillStyle = "green";

			if (result) {
				// console.warn('* quagga onProcessed', result);
				if (result.boxes) {
					drawingCtx.clearRect(
						0,
						0,
						parseInt(drawingCanvas.getAttribute("width") || ""),
						parseInt(drawingCanvas.getAttribute("height") || ""),
					);
					result.boxes
						.filter((box) => box !== result.box)
						.forEach((box) => {
							Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
								color: "purple",
								lineWidth: 2,
							});
						});
				}
				if (result.box) {
					Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
						color: "blue",
						lineWidth: 2,
					});
				}
				if (result.codeResult && result.codeResult.code) {
					// const validated = barcodeValidator(result.codeResult.code);
					// const validated = validateBarcode(result.codeResult.code);
					// Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: validated ? 'green' : 'red', lineWidth: 3 });
					drawingCtx.font = "24px Arial";
					// drawingCtx.fillStyle = validated ? 'green' : 'red';
					// drawingCtx.fillText(`${result.codeResult.code} valid: ${validated}`, 10, 50);
					drawingCtx.fillText(result.codeResult.code, 10, 20);
					// if (validated) {
					//     onDetected(result);
					// }
				}
			}
		};

		useLayoutEffect(() => {
			// if this component gets unmounted in the same tick that it is mounted, then all hell breaks loose,
			// so we need to wait 1 tick before calling init().  I'm not sure how to fix that, if it's even possible,
			// given the asynchronous nature of the camera functions, the non asynchronous nature of React, and just how
			// awful browsers are at dealing with cameras.
			let ignoreStart = false;
			const init = async () => {
				// wait for one tick to see if we get unmounted before we can possibly even begin cleanup
				await new Promise((resolve) => setTimeout(resolve, 1));
				if (ignoreStart) {
					return;
				}
				// begin scanner initialization
				await Quagga.init(
					{
						inputStream: {
							type: "LiveStream",
							constraints: {
								...constraints,
								...(cameraId ? { deviceId: cameraId } : { facingMode }),
							},
							target: scannerRef.current!,
							willReadFrequently: true,
						},
						locator,
						decoder: { readers },
						locate,
					},
					async (err) => {
						Quagga.onProcessed(handleProcessed);

						if (err) {
							return console.error("Error starting Quagga:", err);
						}
						if (scannerRef && scannerRef.current) {
							await Quagga.start();
							if (onScannerReady) {
								onScannerReady();
							}
						}
					},
				);
				Quagga.onDetected(errorCheck);
			};
			init();
			// cleanup by turning off the camera and any listeners
			return () => {
				ignoreStart = true;
				Quagga.stop();
				Quagga.offDetected(errorCheck);
				Quagga.offProcessed(handleProcessed);
			};
		}, [
			cameraId,
			onDetected,
			onScannerReady,
			scannerRef,
			errorCheck,
			constraints,
			locator,
			locate,
			facingMode,
			readers,
		]);
		return null;
	};
