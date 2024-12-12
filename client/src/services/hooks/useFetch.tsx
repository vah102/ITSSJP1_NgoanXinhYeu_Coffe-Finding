import { useEffect, useState } from "react";
import axios from 'axios';

axios.defaults.withCredentials = true; // Bật chế độ gửi cookie

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
                setData(res.data);
            } catch (err: any) {
                setError(err);
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
            setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
};

export default useFetch;
