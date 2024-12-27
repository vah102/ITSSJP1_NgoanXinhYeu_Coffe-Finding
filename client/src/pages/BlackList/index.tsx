// src/pages/BlacklistPage.tsx
import React, { useEffect, useState } from "react";
import { getUserBlacklist, removeStoreFromBlacklist } from "../../services/contexts/BlackList";
import CardBlackList from "../../components/CardBlackList"; // Import CardBlackList
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
const Blacklist: React.FC = () => {
    const{t}=useTranslation();
    const [blacklist, setBlacklist] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const token = Cookies.get("token"); // Lấy token từ cookie

    useEffect(() => {
        if (!token) {
            setError("No token found. Please login.");
            setLoading(false);
            return;
        }

        const fetchBlacklist = async () => {
            try {
                const data = await getUserBlacklist(token);
                setBlacklist(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch blacklist");
                setLoading(false);
            }
        };

        fetchBlacklist();
    }, [token]);

    const handleRemoveStore = async (storeId: number) => {
        if (!token) {
            setError("No token found. Please login.");
            return;
        }
        try {
            await removeStoreFromBlacklist(token, storeId);
            setBlacklist((prev: any) => ({
                ...prev,
                Blacklist_details: prev.Blacklist_details.filter((store: any) => store.store_id !== storeId),
            }));
        } catch (err) {
            setError("Failed to remove store from blacklist");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1 className="text-4xl font-bold">{t("blacklist")}</h1>
            <div>
                {blacklist?.Blacklist_details?.map((store: any) => (
                    <div key={store.store_id}>
                        <CardBlackList
                            avatar={store.Store.logo}
                            name={store.Store.name}
                            rate={store.Store.rate}
                            time_open={store.Store.time_open}
                            style={store.Store.style}
                            address={store.Store.address}
                            store_id={store.store_id} // Truyền store_id xuống
                            handleRemoveStore={handleRemoveStore} // Truyền hàm xử lý xuống
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blacklist;
