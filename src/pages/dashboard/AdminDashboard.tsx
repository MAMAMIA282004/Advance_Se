
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Eye, Check, X, Trash, FileText, AlertTriangle, 
  User, Building, Flag, Search 
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AdminDashboard = () => {
  const [charities, setCharities] = useState([
    { 
      id: 1, 
      name: 'Red Cross Local Chapter', 
      email: 'info@redcross-local.org',
      status: 'approved', 
      registrationDate: '2023-01-15',
      documentVerified: true
    },
    { 
      id: 2, 
      name: 'Food Bank Inc.', 
      email: 'contact@foodbank.org',
      status: 'approved', 
      registrationDate: '2023-02-10',
      documentVerified: true
    },
    { 
      id: 3, 
      name: 'Shelter Hope', 
      email: 'info@shelterhope.org',
      status: 'pending', 
      registrationDate: '2023-05-05',
      documentVerified: false
    },
    { 
      id: 4, 
      name: 'Education First', 
      email: 'support@educationfirst.org',
      status: 'pending', 
      registrationDate: '2023-05-08',
      documentVerified: false
    },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', registrationDate: '2023-03-10', lastActive: '2023-05-11' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', registrationDate: '2023-03-12', lastActive: '2023-05-10' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', registrationDate: '2023-04-05', lastActive: '2023-05-09' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', registrationDate: '2023-04-15', lastActive: '2023-05-12' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', registrationDate: '2023-05-01', lastActive: '2023-05-10' },
  ]);

  const [reports, setReports] = useState([
    { 
      id: 1, 
      type: 'comment', 
      reporter: 'Jane Smith', 
      reported: 'Bob Johnson', 
      content: 'Inappropriate language in comment', 
      date: '2023-05-10',
      status: 'pending'
    },
    { 
      id: 2, 
      type: 'post', 
      reporter: 'Michael Brown', 
      reported: 'Red Cross Local Chapter', 
      content: 'Misleading information in charity post', 
      date: '2023-05-09',
      status: 'pending'
    },
    { 
      id: 3, 
      type: 'comment', 
      reporter: 'Sarah Williams', 
      reported: 'John Doe', 
      content: 'Harassment in comment section', 
      date: '2023-05-08',
      status: 'pending'
    },
  ]);

  const [selectedCharity, setSelectedCharity] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [reportActionDialogOpen, setReportActionDialogOpen] = useState(false);

  const handleCharityAction = (id: number, action: 'approve' | 'decline' | 'delete') => {
    if (action === 'delete') {
      setCharities(charities.filter(charity => charity.id !== id));
      alert(`Charity ID ${id} has been deleted.`);
    } else if (action === 'approve' || action === 'decline') {
      const updatedCharities = charities.map(charity => {
        if (charity.id === id) {
          return { ...charity, status: action === 'approve' ? 'approved' : 'declined' };
        }
        return charity;
      });
      setCharities(updatedCharities);
      alert(`Charity application ${action === 'approve' ? 'approved' : 'declined'}.`);
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    alert(`User ID ${id} has been deleted.`);
  };

  const handleViewCharity = (id: number) => {
    const charity = charities.find(c => c.id === id);
    setSelectedCharity(charity);
    setViewDialogOpen(true);
  };

  const handleViewUser = (id: number) => {
    const user = users.find(u => u.id === id);
    setSelectedUser(user);
    setViewDialogOpen(true);
  };

  const handleViewReport = (id: number) => {
    const report = reports.find(r => r.id === id);
    setSelectedReport(report);
    setViewDialogOpen(true);
  };

  const handleReportAction = (id: number, action: 'removeContent' | 'removeAll') => {
    if (action === 'removeContent') {
      const updatedReports = reports.map(report => {
        if (report.id === id) {
          return { ...report, status: 'resolved' };
        }
        return report;
      });
      setReports(updatedReports);
      setReportActionDialogOpen(false);
      alert('Content has been removed.');
    } else if (action === 'removeAll') {
      const updatedReports = reports.map(report => {
        if (report.id === id) {
          return { ...report, status: 'resolved' };
        }
        return report;
      });
      setReports(updatedReports);
      setReportActionDialogOpen(false);
      alert('Content and user/charity account have been removed.');
    }
  };

  return (
    <MainLayout>
      <div className="bg-hope-gray py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-hope-dark-gray mb-6">Admin Dashboard</h1>
          
          <Tabs defaultValue="charities">
            <TabsList className="mb-8 bg-white">
              <TabsTrigger value="charities" className="flex items-center gap-2">
                <Building className="h-4 w-4" /> Manage Charities
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Manage Users
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <Flag className="h-4 w-4" /> Manage Reports
              </TabsTrigger>
            </TabsList>
            
            {/* Charities Tab */}
            <TabsContent value="charities">
              <Card>
                <CardHeader>
                  <CardTitle>Charity Management</CardTitle>
                  <CardDescription>Review, approve, and manage charity applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="text"
                        placeholder="Search charities..."
                        className="pl-9 pr-4 py-2 border rounded-md w-full md:w-80"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Export List</Button>
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Charity Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {charities.map((charity) => (
                        <TableRow key={charity.id}>
                          <TableCell>{charity.id}</TableCell>
                          <TableCell>{charity.name}</TableCell>
                          <TableCell>{charity.email}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={charity.status === 'approved' ? 'outline' : 'secondary'}
                              className={charity.status === 'approved' 
                                ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                                : charity.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                  : 'bg-red-100 text-red-800 hover:bg-red-100'
                              }
                            >
                              {charity.status.charAt(0).toUpperCase() + charity.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{charity.registrationDate}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewCharity(charity.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              {charity.status === 'pending' && (
                                <>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleCharityAction(charity.id, 'approve')}
                                    className="text-green-600 hover:text-green-700"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleCharityAction(charity.id, 'decline')}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleCharityAction(charity.id, 'delete')}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Review and manage user accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="text"
                        placeholder="Search users..."
                        className="pl-9 pr-4 py-2 border rounded-md w-full md:w-80"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Export List</Button>
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.registrationDate}</TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewUser(user.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Reports Tab */}
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Report Management</CardTitle>
                  <CardDescription>Handle reported content and users</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Reporter</TableHead>
                        <TableHead>Reported</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>{report.id}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {report.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{report.reporter}</TableCell>
                          <TableCell>{report.reported}</TableCell>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              className={report.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                : 'bg-green-100 text-green-800 hover:bg-green-100'
                              }
                            >
                              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewReport(report.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {report.status === 'pending' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedReport(report);
                                    setReportActionDialogOpen(true);
                                  }}
                                  className="text-yellow-600 hover:text-yellow-700"
                                >
                                  <AlertTriangle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* View Dialog for Charity/User/Report details */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedCharity ? 'Charity Details' : selectedUser ? 'User Details' : 'Report Details'}
            </DialogTitle>
            <DialogDescription>
              {selectedCharity ? 'View charity information and verification documents' : 
               selectedUser ? 'View user information and activity' : 
               'Review reported content details'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {selectedCharity && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Charity Information</h3>
                  <div className="mt-2 space-y-2">
                    <p><strong>Name:</strong> {selectedCharity.name}</p>
                    <p><strong>Email:</strong> {selectedCharity.email}</p>
                    <p><strong>Status:</strong> {selectedCharity.status}</p>
                    <p><strong>Registration Date:</strong> {selectedCharity.registrationDate}</p>
                    <p><strong>Document Verified:</strong> {selectedCharity.documentVerified ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Verification Document</h3>
                  <div className="mt-2 p-4 border border-dashed rounded-md flex items-center justify-center">
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      View Document
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {selectedUser && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">User Information</h3>
                  <div className="mt-2 space-y-2">
                    <p><strong>Name:</strong> {selectedUser.name}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Registration Date:</strong> {selectedUser.registrationDate}</p>
                    <p><strong>Last Active:</strong> {selectedUser.lastActive}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Activity Summary</h3>
                  <div className="mt-2 space-y-2">
                    <p><strong>Total Donations:</strong> 5</p>
                    <p><strong>Help Requests:</strong> 2</p>
                    <p><strong>Comments:</strong> 12</p>
                  </div>
                </div>
              </div>
            )}
            
            {selectedReport && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Report Information</h3>
                  <div className="mt-2 space-y-2">
                    <p><strong>Type:</strong> {selectedReport.type.charAt(0).toUpperCase() + selectedReport.type.slice(1)}</p>
                    <p><strong>Reported by:</strong> {selectedReport.reporter}</p>
                    <p><strong>Reported:</strong> {selectedReport.reported}</p>
                    <p><strong>Date:</strong> {selectedReport.date}</p>
                    <p><strong>Status:</strong> {selectedReport.status}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Reported Content</h3>
                  <div className="mt-2 p-4 border rounded-md bg-gray-50">
                    <p className="text-sm">{selectedReport.content}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Report Action Dialog */}
      <Dialog open={reportActionDialogOpen} onOpenChange={setReportActionDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Take Action on Report</DialogTitle>
            <DialogDescription>
              Choose what action to take on this reported content
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4">
              This will handle the reported {selectedReport?.type}. Please select an appropriate action:
            </p>
            
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start text-left"
                onClick={() => selectedReport && handleReportAction(selectedReport.id, 'removeContent')}
              >
                <div>
                  <p className="font-medium">Remove Content Only</p>
                  <p className="text-sm text-gray-500">Delete just the reported {selectedReport?.type}</p>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start text-left"
                onClick={() => selectedReport && handleReportAction(selectedReport.id, 'removeAll')}
              >
                <div>
                  <p className="font-medium">Remove Content & User/Charity</p>
                  <p className="text-sm text-gray-500">Delete the content and block the account</p>
                </div>
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportActionDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default AdminDashboard;
