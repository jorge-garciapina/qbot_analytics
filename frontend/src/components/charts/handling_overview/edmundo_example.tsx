import React, { useState } from "react";
import { ModalContainer } from "./ModalContainer";
import { useSpecialData } from "./specialDataHook";
import { ChartsContainer } from "./ChartsContainer";
import { BarChart } from "./BarChart";
import { AppointmentsDetailModal } from "./AppointmentsDetailModal";
import { AppointmentsDataModal } from "./AppointmentsDataModal";

export function ChartCard({ title, chart, DetailsModal, dataModal }) {
  // isOpen tracks whether the modal is currently visible
  const [isOpen, setIsOpen] = useState(false);
  // modalId determines which modal ("details" or "data") is displayed
  const [modalId, setModalId] = useState(null);

  // Grab any special data needed for the details modal
  const specialData = useSpecialData();

  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        {/* Display the title passed in as a prop */}
        <p>{title}</p>

        {/* Render the chart prop (e.g., a BarChart) */}
        <div>{chart}</div>

        {/* Button to open the details modal */}
        <button
          onClick={() => {
            setIsOpen(true);
            setModalId("details");
          }}
        >
          open details
        </button>

        {/* Button to open the data modal */}
        <button
          onClick={() => {
            setIsOpen(true);
            setModalId("data");
          }}
        >
          open data
        </button>
      </div>

      {/* ModalContainer is a wrapper component that controls modal visibility */}
      <ModalContainer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setModalId(null);
        }}
      >
        {/* Conditionally render the details modal or data modal based on modalId */}
        {modalId === "details" && DetailsModal(specialData)}
        {modalId === "data" && dataModal}
      </ModalContainer>
    </>
  );
}

function Dashboard() {
  return (
    <ChartsContainer>
      {/* ChartCard takes in a chart component and two types of modals */}
      <ChartCard
        title="Appointments"
        chart={<BarChart />}
        // Pass a function so we can send specialData into AppointmentsDetailModal
        DetailsModal={(specialData) => (
          <AppointmentsDetailModal extra={specialData} />
        )}
        // Pass the data modal component directly
        dataModal={<AppointmentsDataModal />}
      />
    </ChartsContainer>
  );
}

export { ChartCard, Dashboard };
