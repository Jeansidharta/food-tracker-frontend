import { FC, useState } from "react";
import { BarcodeScanner } from "../../../../components/barcode-scanner";
import { Button, Group } from "@mantine/core";
import { useScanIngredient } from "../../../../api/ingredients";
import { usePageScanIngredientLoaderData } from "./loader";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../router/routes";
// import styles from "./styles.module.css";

export const PageIngredientScan: FC = () => {
	const [barcode, setBarcode] = useState<string | null>(null);
	const { ingredient_id } = usePageScanIngredientLoaderData();
	const { scanIngredient, isMutating: isLoadingSubmit } = useScanIngredient();
	const navigate = useNavigate();

	async function submit() {
		await scanIngredient({ product_code: barcode!, ingredient_id });
		navigate(ROUTES.INGREDIENT.ID.buildPath({ ingredient_id }));
	}
	return (
		<div>
			<h1>Scanning Ingredient</h1>
			<div style={{ width: 200, height: 200 }}>
				{barcode && (
					<div style={{ margin: '16px 0' }}>
						<p>Found "{barcode}"</p>
						<Group>
							<Button variant="default" onClick={() => setBarcode(null)}>
								Rescan
							</Button>
							<Button onClick={submit} loading={isLoadingSubmit}>
								Next step
							</Button>
						</Group>
					</div>
				)}
				<BarcodeScanner enabled={!barcode} onDetected={setBarcode} />
			</div>
		</div>
	);
};
