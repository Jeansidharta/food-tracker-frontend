import { FC, useEffect, useRef, useState } from "react";
import Quagga, { QuaggaJSCodeReader } from "@ericblade/quagga2";
import { Scanner } from "./scanner";
import { Group, Select } from "@mantine/core";

export const BarcodeScanner: FC<{
	onDetected?: (result: string) => void;

	readers: QuaggaJSCodeReader[];
	enabled?: boolean;
}> = ({ onDetected, enabled = true, readers }) => {
	const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]); // array of available cameras, as returned by Quagga.CameraAccess.enumerateVideoDevices()
	const [cameraId, setCameraId] = useState<string | null>(null); // id of the active camera device
	const [cameraError, setCameraError] = useState(null); // error message from failing to access the camera
	const scannerRef = useRef(null);

	useEffect(() => {
		async function run() {
			const cameras = await Quagga.CameraAccess.enumerateVideoDevices();
			setCameras(cameras);
			setCameraId(cameras[0].deviceId);
		}
		run().catch((err) => setCameraError(err));
		return () => {
			Quagga.CameraAccess.release();
		};
	}, []);

	return (
		<div>
			{cameraError ? (
				<p>
					ERROR INITIALIZING CAMERA ${JSON.stringify(cameraError)} -- DO YOU
					HAVE PERMISSION?
				</p>
			) : null}
			<Group mb="md">
				{cameras.length === 0 ? (
					<p>
						Enumerating Cameras, browser may be prompting for permissions
						beforehand
					</p>
				) : (
					<Select
						label="Cameras"
						onChange={(value) => setCameraId(value)}
						value={cameraId}
						data={cameras.map((camera) => ({
							label: camera.label || camera.deviceId,
							value: camera.deviceId,
						}))}
					/>
				)}
			</Group>
			<div ref={scannerRef} style={{ position: "relative" }}>
				<canvas
					className="drawingBuffer"
					style={{
						position: "absolute",
						top: "0px",
						border: "3px solid green",
					}}
					width="100"
					height="100"
				/>
				{cameraId && enabled && (
					<Scanner
						scannerRef={scannerRef}
						cameraId={{ exact: cameraId! }}
						onDetected={onDetected}
						facingMode={{ ideal: "environment" }}
						readers={readers}
					/>
				)}
			</div>
		</div>
	);
};
