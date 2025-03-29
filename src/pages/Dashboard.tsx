
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ExternalLink, Loader2, Search, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { formatDate } from '@/lib/utils';

interface SearchHistoryItem {
  id: string;
  query: string;
  url: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchSearchHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('search_history')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setSearchHistory(data || []);
      } catch (error) {
        console.error('Error fetching search history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchHistory();
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="container py-20 px-4 md:px-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {user?.email}
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => navigate('/score-website')}
              >
                <Search className="h-4 w-4" />
                New Website Analysis
              </Button>
              <Button onClick={handleSignOut} variant="secondary">Sign Out</Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Search History</CardTitle>
              <CardDescription>
                View all your previous website analyses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : searchHistory.length === 0 ? (
                <div className="text-center py-10">
                  <Search className="h-10 w-10 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No search history found</h3>
                  <p className="mt-1 text-muted-foreground">
                    You haven't analyzed any websites yet
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => navigate('/score-website')}
                  >
                    Analyze a Website
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Website URL</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchHistory.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.url}</TableCell>
                          <TableCell>{formatDate(new Date(item.created_at))}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(item.url, '_blank')}
                              >
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Visit Site</span>
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => navigate(`/score-website?url=${encodeURIComponent(item.url)}`)}
                              >
                                <Search className="h-4 w-4 mr-1" />
                                Analyze Again
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
