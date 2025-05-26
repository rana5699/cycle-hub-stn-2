import OfferEnded from "@/components/Module/Offered/OfferedEnded";

export default function OfferEndedPage() {
  return (
    <div className="container py-12">
      <div className="min-h-screen bg-gradient-to-br  py-12">
        <div className="container">

          <OfferEnded
            offerTitle="Flash Sale: Road Bikes"
            originalDiscount="50% OFF"
            endDate="September 15, 2023"
            showNotificationSignup={true}
          />
        </div>
      </div>
    </div>
  );
}
