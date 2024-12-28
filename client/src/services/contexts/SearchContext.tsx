import React, { useContext, useEffect, useState } from "react";

type SearchContext = {
    keyword: string;
    sortOrder: string;
    styles: string[];
    features: string[];
    price: {
        min_price: number | null;
        max_price: number | null;
    };
    location: {
        lat: number | null;
        lon: number | null;
    };
    queryParam: string;
    saveSearchValues: (keyword: string) => void;
    saveSortValues: (sortOrder: string) => void;
    saveStyleValues: (styles: string[]) => void;
    saveFeatureValues: (features: string[]) => void;
    savePriceValues: (price: {
        min_price: number | null;
        max_price: number | null;
    }) => void;
    saveLocationValues: (location: {
        lat: number | null;
        lon: number | null;
    }) => void;
    saveQueryParam: (queryParam: string) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
    children: React.ReactNode;
};

export const SearchContextProvider = ({
    children,
}: SearchContextProviderProps) => {
    const savedData = localStorage.getItem("searchContext");
    const [keyword, setKeyword] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>(
        savedData ? JSON.parse(savedData).sortOrder : ""
    );
    const [styles, setStyles] = useState<string[]>(
        savedData ? JSON.parse(savedData).styles : []
    );
    const [features, setFeatures] = useState<string[]>(
        savedData ? JSON.parse(savedData).features : []
    );
    const [price, setPrice] = useState<{
        min_price: number | null;
        max_price: number | null;
    }>(
        savedData
            ? JSON.parse(savedData).price
            : {
                  min_price: null,
                  max_price: null,
              }
    );

    const [location, setLocation] = useState<{
        lat: number | null;
        lon: number | null;
    }>(
        savedData
            ? JSON.parse(savedData).location
            : {
                  lat: null,
                  lon: null,
              }
    );

    const [queryParam, setQueryParam] = useState<string>("");

    const saveSearchValues = (keyword: string) => {
        setKeyword(keyword);
    };

    const saveSortValues = (sortOrder: string) => {
        setSortOrder(sortOrder);
    };

    const saveStyleValues = (styles: string[]) => {
        setStyles(styles);
    };

    const saveFeatureValues = (features: string[]) => {
        setFeatures(features);
    };

    const savePriceValues = (price: {
        min_price: number | null;
        max_price: number | null;
    }) => {
        setPrice(price);
    };

    const saveLocationValues = (location: {
        lat: number | null;
        lon: number | null;
    }) => {
        setLocation(location);
    };

    const saveQueryParam = (queryParam: string) => {
        setQueryParam(queryParam);
    };

    // Lưu dữ liệu vào localStorage mỗi khi context thay đổi
    useEffect(() => {
        const contextData = {
            keyword,
            sortOrder,
            styles,
            features,
            price,
            location,
        };
        localStorage.setItem("searchContext", JSON.stringify(contextData));
        const params = new URLSearchParams();
        if (keyword) params.set("searchTerm", keyword);
        if (sortOrder) params.set("sortOrder", sortOrder);
        if (styles.length > 0) params.set("styles", styles.join(","));
        if (features.length > 0) params.set("features", features.join(","));
        if (price.min_price !== null)
            params.set("minPrice", price.min_price.toString());
        if (price.max_price !== null)
            params.set("maxPrice", price.max_price.toString());
        if (location.lat !== null)
            params.set("latitude", location.lat.toString());
        if (location.lon !== null)
            params.set("longitude", location.lon.toString());

        const queryString = params.toString();
        setQueryParam(queryString);
    }, [keyword, sortOrder, styles, features, price, location]);

    return (
        <SearchContext.Provider
            value={{
                keyword,
                sortOrder,
                styles,
                features,
                price,
                location,
                queryParam,
                saveSearchValues,
                saveSortValues,
                saveStyleValues,
                saveFeatureValues,
                savePriceValues,
                saveLocationValues,
                saveQueryParam,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContext;
};
