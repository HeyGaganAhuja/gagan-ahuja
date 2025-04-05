
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface SearchHistoryItem {
  id: string;
  query: string;
  url: string;
  created_at: string;
}

const Dashboard = () => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSearchHistory = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('search_history')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(10);
          
          if (error) throw error;
          
          // Use type assertion to convert Supabase result to SearchHistoryItem[]
          if (data) setSearchHistory(data as unknown as SearchHistoryItem[]);
        } catch (error) {
          console.error('Error fetching search history:', error);
        }
      }
    };

    fetchSearchHistory();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {searchHistory.length > 0 ? (
            <ul className="space-y-4">
              {searchHistory.map((item) => (
                <li key={item.id} className="border-b pb-2">
                  <p className="font-medium">{item.query}</p>
                  <p className="text-sm text-gray-500">
                    URL: {item.url}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
