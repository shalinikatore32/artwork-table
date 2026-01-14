import { useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import type { Artwork } from "../types/artwork";
import "./SelectionOverlay.css";

interface SelectionOverlayProps {
  artworks: Artwork[];
  onSelect: (ids: number[]) => void;
}

export function SelectionOverlay({
  artworks,
  onSelect,
}: SelectionOverlayProps) {
  const overlayRef = useRef<OverlayPanel>(null);
  const [count, setCount] = useState<number | null>(null);

  const handleApply = () => {
    if (!count || count <= 0) {
      alert("Please enter a valid number");
      return;
    }

    if (count > artworks.length) {
      alert("Cannot select more rows than available on this page");
      return;
    }

    const selectedIds = artworks.slice(0, count).map((art) => art.id);
    onSelect(selectedIds);

    overlayRef.current?.hide();
    setCount(null);
  };

  return (
    <div className="custom-select-container">
      <Button
        label="Custom Select"
        icon="pi pi-sliders-h"
        className="custom-select-btn"
        onClick={(e) => overlayRef.current?.toggle(e)}
      />

      <OverlayPanel ref={overlayRef} className="custom-select-overlay">
        <div className="custom-select-content">
          <label className="custom-select-label">
            Select rows from current page
          </label>

          <InputNumber
            value={count}
            onValueChange={(e) => setCount(e.value ?? null)}
            placeholder={`Max ${artworks.length}`}
            min={1}
            max={artworks.length}
            showButtons
            className="custom-select-input"
          />

          <small className="custom-select-hint">
            Only rows from the current page will be selected.
          </small>

          <Button
            label="Apply Selection"
            icon="pi pi-check"
            onClick={handleApply}
            disabled={!count}
            className="custom-select-apply-btn"
          />
        </div>
      </OverlayPanel>
    </div>
  );
}
