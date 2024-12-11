import React, { useEffect, useRef } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { ENVIROMENT } from '../../Data/data';
import { getGMAPS } from '../../fetching/http.fetching';


const MapAutocompleteComponent = () => {
  const libraries = ['places'];
  
  const handlePlaceSelected = (place) => {
    console.log(place.url);
  }
  
  let G_MAPS_API_KEY = ''

  useEffect(() => {
    const getKey = async () => {
      G_MAPS_API_KEY = await getGMAPS()
    }
    getKey()
  }, [])


  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: G_MAPS_API_KEY, // put your API key here
    libraries,
    language: 'es',
    region: 'ar',
    preventGoogleFontsLoading: true,
  });
  
  const inputRef = useRef(null);
  const autocomplete = useRef(null);

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      autocomplete.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['route'], // Change this to fit your needs
      });

      autocomplete.current.addListener('place_changed', () => {
        const place = autocomplete.current.getPlace();
        handlePlaceSelected(place)
      });
    }
  }, [isLoaded]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
  <div className="form-floating mb-3">
    <input
      className="form-control autoc"
      id="autocomplete"
      name='autocomplete'
      ref={inputRef}
      type="text"
      placeholder="Ingrese una ubicación"
      />
    <label htmlFor="autocomplete">Ingrese la direccion del lugar</label>
  </div>
  );
};

export default MapAutocompleteComponent;