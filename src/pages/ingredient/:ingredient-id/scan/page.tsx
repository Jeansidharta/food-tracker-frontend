import { FC, useMemo, useState } from "react";
import { BarcodeScanner } from "../../../../components/barcode-scanner";
import { Button, Group, MultiSelect, TextInput } from "@mantine/core";
import { useScanIngredient } from "../../../../api/ingredients";
import { usePageScanIngredientLoaderData } from "./loader";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../router/routes";
import { QuaggaJSCodeReader } from "@ericblade/quagga2";
// import styles from "./styles.module.css";

const allPossibleReaders: QuaggaJSCodeReader[] = [
	"upc_reader",
	"upc_e_reader",
	"code_128_reader",
	"ean_reader",
	"ean_5_reader",
	"ean_2_reader",
	"ean_8_reader",
	"code_39_reader",
	"code_39_vin_reader",
	"codabar_reader",
	"i2of5_reader",
	"2of5_reader",
	"code_93_reader",
	"code_32_reader",
];

export const PageIngredientScan: FC = () => {
	const [barcode, setBarcode] = useState<string | null>(null);
	const [hasScannedBarcode, setHasScannedBarcode] = useState<boolean>(false);
	const { ingredient_id } = usePageScanIngredientLoaderData();
	const [readers, setReaders] = useState<QuaggaJSCodeReader[]>(["upc_reader"]);
	const { scanIngredient, isMutating: isLoadingSubmit } = useScanIngredient();
	const navigate = useNavigate();

	async function submit() {
		await scanIngredient({ product_code: barcode!, ingredient_id });
		navigate(ROUTES.INGREDIENT.ID.buildPath({ ingredient_id }));
	}
	return (
		<div>
			<h1>Scanning Ingredient</h1>
			<div>
				<Group my="md">
					<Group align="end">
						<TextInput
							label="Barcode"
							onChange={(code) => setBarcode(code.target.value)}
							value={barcode || ""}
						/>
						<Button
							onClick={submit}
							loading={isLoadingSubmit}
							disabled={!barcode}
						>
							Next step
						</Button>
					</Group>
				</Group>
				<Group align="end">
					<MultiSelect
						label="Barcode types"
						data={allPossibleReaders}
						value={readers}
						onChange={(data) =>
							setReaders(data as unknown as QuaggaJSCodeReader[])
						}
					/>
					{hasScannedBarcode && (
						<Button
							variant="default"
							onClick={() => setHasScannedBarcode(false)}
						>
							Rescan
						</Button>
					)}
				</Group>
				{useMemo(
					() => (
						<BarcodeScanner
							readers={readers}
							enabled={!hasScannedBarcode}
							onDetected={(code) => {
								setBarcode(code);
								setHasScannedBarcode(true);
							}}
						/>
					),
					[readers, hasScannedBarcode, setBarcode, setHasScannedBarcode],
				)}
			</div>
		</div>
	);
};
