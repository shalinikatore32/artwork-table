import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import type { DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";

import type { Artwork } from "../types/artwork";
import { fetchArtworks as fetchArtworksByPage } from "../api/artworks";
import { SelectionOverlay } from "./SelectionOverlay";
import "./ArtworkTable.css";

export function ArtworkTable() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;
  const [totalRecords, setTotalRecords] = useState(0);

  const [selectedRowIds, setSelectedRowIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);
      try {
        const response = await fetchArtworksByPage(currentPage);
        setArtworks(response.data);
        setTotalRecords(response.pagination.total);
      } catch (err) {
        console.error("Failed to load artworks", err);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, [currentPage]);

  const selectedArtworks = artworks.filter((a) => selectedRowIds.has(a.id));

  const onSelectionChange = (e: { value: Artwork[] }) => {
    const updated = new Set(selectedRowIds);

    e.value.forEach((art) => updated.add(art.id));

    artworks.forEach((art) => {
      if (!e.value.some((s) => s.id === art.id)) {
        updated.delete(art.id);
      }
    });

    setSelectedRowIds(updated);
  };

  const handleCustomSelect = (ids: number[]) => {
    setSelectedRowIds((prev) => {
      const updated = new Set(prev);
      ids.forEach((id) => updated.add(id));
      return updated;
    });
  };

  const formatValue = (v: string | number | null | undefined) =>
    v === null || v === undefined || v === "" ? "N/A" : v;

  return (
    <div className="artwork-table-wrapper artwork-table">
      <div className="table-toolbar">
        <div className="selected-count">
          Selected: <strong>{selectedRowIds.size}</strong> rows
        </div>
      </div>
      <SelectionOverlay artworks={artworks} onSelect={handleCustomSelect} />

      <DataTable
        value={artworks}
        loading={loading}
        paginator
        lazy
        rows={rowsPerPage}
        totalRecords={totalRecords}
        first={(currentPage - 1) * rowsPerPage}
        onPage={(e: DataTablePageEvent) => {
          if (e.page !== undefined) {
            setCurrentPage(e.page + 1);
          }
        }}
        selection={selectedArtworks}
        onSelectionChange={onSelectionChange}
        dataKey="id"
        paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />

        <Column
          field="title"
          header="Title"
          body={(r) => formatValue(r.title)}
        />
        <Column
          field="place_of_origin"
          header="Place of Origin"
          body={(r) => formatValue(r.place_of_origin)}
        />
        <Column
          field="artist_display"
          header="Artist"
          body={(r) => formatValue(r.artist_display)}
        />
        <Column
          field="inscriptions"
          header="Inscriptions"
          body={(r) => formatValue(r.inscriptions)}
        />
        <Column
          field="date_start"
          header="Date Start"
          body={(r) => formatValue(r.date_start)}
        />
        <Column
          field="date_end"
          header="Date End"
          body={(r) => formatValue(r.date_end)}
        />
      </DataTable>
    </div>
  );
}
