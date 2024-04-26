import { useEffect, useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        // logic jika ada error dari hit api backend
        if (!response.ok) {
          throw new Error("failed to fetch data");
        }

        setAvailablePlaces(resData.places);
      } catch (error) {
        setError(error);
      }

      setIsFetching(false);
    }
    fetchData();
  }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Data is fetching..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
