// Import components
import BannerCard from "./banner-card";

// Import states
import { useBannerState } from "src/states/banner";

export default function BannerListView() {
  const { banners } = useBannerState();

  return (
    <>
      {banners === null ? (
        <p>Loading...</p>
      ) : (
        banners.map((banner) => {
          return <BannerCard key={banner._id} data={banner} />;
        })
      )}
    </>
  );
}
