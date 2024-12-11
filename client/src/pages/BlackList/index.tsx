// src/pages/BlacklistPage.tsx
import React, { useEffect, useState } from 'react';
import { getUserBlacklist, addStoreToBlacklist, removeStoreFromBlacklist } from '../../services/contexts/BlackList';
import CardBlackList from '../../components/CardBlackList'; // 


const Blacklist: React.FC = () => {
  const [blacklist, setBlacklist] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem('token'); 

  useEffect(() => {
    if (!token) {
      setError('No token found. Please login.');
      setLoading(false);
      return;
    }

    // Lấy dữ liệu blacklist khi component load
    const fetchBlacklist = async () => {
      try {
        const data = await getUserBlacklist(token); // Gọi service để lấy dữ liệu
        setBlacklist(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blacklist');
        setLoading(false);
      }
    };

    fetchBlacklist();
  }, [token]);

  const handleAddStore = async (storeId: number) => {
    if (!token) {
      setError('No token found. Please login.');
      return;
    }
    try {
      const result = await addStoreToBlacklist(token, storeId);
      setBlacklist((prev: any) => ({
        ...prev,
        Blacklist_details: [...prev.Blacklist_details, result.blacklistDetail],
      }));
    } catch (err) {
      setError('Failed to add store to blacklist');
    }
  };

  const handleRemoveStore = async (storeId: number) => {
    if (!token) {
      setError('No token found. Please login.');
      return;
    }
    try {
      await removeStoreFromBlacklist(token, storeId);
      setBlacklist((prev: any) => ({
        ...prev,
        Blacklist_details: prev.Blacklist_details.filter((store: any) => store.store_id !== storeId),
      }));
    } catch (err) {
      setError('Failed to remove store from blacklist');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Your Blacklist</h1>
      <div>
        {blacklist?.Blacklist_details?.map((store: any) => (
          <div key={store.store_id}>
            {/* Hiển thị thông tin của store trong blacklist bằng CardBlackList */}
            <CardBlackList
              avatar={store.Store.avatar}
              name={store.Store.name}
              rate={store.Store.rate}
              time_open={store.Store.time_open}
              style={store.Store.style}
              address={store.Store.address}
            />
            <button onClick={() => handleRemoveStore(store.store_id)}>Remove from blacklist</button>
          </div>
        ))}
      </div>
      <button onClick={() => handleAddStore(123)}>Add Store to Blacklist</button> {/* Example store ID */}
    </div>
  );
};

export default Blacklist;

