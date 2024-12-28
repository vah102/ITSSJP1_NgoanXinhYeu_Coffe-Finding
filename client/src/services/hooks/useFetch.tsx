import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = <T,>(url: string) => {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get<T>(url, {
                    withCredentials: true, // Gửi kèm cookie
                });
                console.log(res);
                setData(res.data);
            } catch (err: any) {
                if (err.response && err.response.status === 404) {
                    console.log(
                        "Store not found on re-fetch, setting data to null"
                    );
                    setData(undefined);
                } else {
                    setError(err); // Lưu lỗi nếu không phải 404
                }
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get<T>(url, {
                withCredentials: true, // Gửi kèm cookie
            });
            setData(res.data);
        } catch (err: any) {
            if (err.response && err.response.status === 404) {
                console.log(
                    "Store not found on re-fetch, setting data to null"
                );
                setData(undefined);
            } else {
                setError(err); // Lưu lỗi nếu không phải 404
            }
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
};

export default useFetch;
