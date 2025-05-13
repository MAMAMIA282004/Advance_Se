
import { useEffect, useState } from 'react';
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
import { ApproveCharity, DeleteUser, GetCharitiesData, GetUsersData } from '@/Api/Admin/admin';
import { IAdminCharity, IAdminUser, IReport } from '@/interfaces/interfaces';
import { Link } from 'react-router-dom';
import { GetAllReports } from '@/Api/reports/reports';
import { DeleteComment, DeletePost } from '@/Api/posts/posts';

const AdminDashboard = () => {
  const [charities, setCharities] = useState<IAdminCharity[]>([])

  const [users, setUsers] = useState<IAdminUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IAdminUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [currentCharityPage, setCurrentCharityPage] = useState(1);
  const [filteredCharities, setFilteredCharities] = useState<IAdminCharity[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await GetUsersData();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const data = await GetCharitiesData("");
        setCharities(data);
        setFilteredCharities(data);
        setCharities(data);
      } catch (error) {
        console.error("Error fetching charities:", error);
      }
    };

    fetchCharities();
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await GetAllReports();
        setReports(response);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [reports, setReports] = useState<IReport[]>();
  const [selectedCharity, setSelectedCharity] = useState<IAdminCharity>(null);
  const [selectedUser, setSelectedUser] = useState<IAdminUser>(null);
  const [selectedReport, setSelectedReport] = useState<IReport>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [reportActionDialogOpen, setReportActionDialogOpen] = useState(false);
  const handleSearchUser = (search: string) => {
    setFilteredUsers(users.filter(user => user.fullName.toLowerCase().includes(search.toLowerCase())));
  };

  function handleOpenDialog() {
    setViewDialogOpen(!viewDialogOpen);
    if (selectedCharity) setSelectedCharity(null)
    if (selectedReport) setSelectedReport(null)
    if (selectedUser) setSelectedUser(null)
  }

  const handleCharityAction = async (id: string, action: 'approve' | 'decline' | 'delete') => {
    if (action === 'delete') {
      const confirmDelete = window.confirm("Are you sure you want to delete this charity?");
      if (!confirmDelete) return;
      try {
        const res = await DeleteUser(id);
        if (res.status == 200) {
          alert(`User with id: ${id} deleted successfully`);
        }
        setCharities(charities.filter(charity => charity.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    } else if (action === 'approve') {
      try {
        const res = await ApproveCharity(id);
        if (res.status === 200) {
          alert(`Charity with id: ${id} approved successfully`);
          setCharities(
            charities.map((charity) =>
              charity.id === id ? { ...charity, status: "Approved" } : charity
            )
          );
        }
      } catch (error) {
        console.error("Error approving charity:", error);
        alert("Failed to approve charity. Please try again.");
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
    try {
      const res = await DeleteUser(id);
      if (res.status == 200) {
        alert(`User with id: ${id} deleted successfully`);
      }
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const handleViewCharity = (id: string) => {
    const charity = charities.find(c => c.id === id);
    setSelectedCharity(charity);
    setViewDialogOpen(true);
  };

  const handleViewUser = (id: string) => {
    const user = users.find(u => u.id === id);
    setSelectedUser(user);
    setViewDialogOpen(true);
  };

  const handleViewReport = (id: number) => {
    const report = reports.find(r => r.id === id);
    setSelectedReport(report);
    setViewDialogOpen(true);
  };

  const handleReportAction = async (id: number, type: "Comment" | "Post") => {
    const confirmAction = window.confirm("Are you sure you want to remove this content?");
    if (!confirmAction) return;
    try {
      let response;
      if (type == "Comment")
        response = await DeleteComment(id);
      else
        response = await DeletePost(id);
      if (response.status == 200) {
        alert(`Content with id: ${id} removed successfully`);
        setReports(reports.filter(report => report.id !== id));
      }
      else {
        alert("Failed to remove content. Please try again.");
      }
    } catch (error) {
      console.error("Error removing content:", error);
      alert("Failed to remove content. Please try again.");
    }
  }

  return (
    <MainLayout>
      <div className="bg-hope-gray py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-hope-dark-gray mb-6">Admin Dashboard</h1>

          <Tabs defaultValue="charities">
            <TabsList className="mb-8 bg-white flex justify-around">
              <TabsTrigger
                value="charities"
                className="data-[state=active]:text-hope-orange data-[state=active]:font-semibold rounded-none data-[state=active]:lg:border-b-2 data-[state=active]:border-b border-hope-orange data-[state=active]:lg:text-lg data-[state=active]:shadow-none"
              >
                Manage Charities
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="data-[state=active]:text-hope-orange data-[state=active]:font-semibold rounded-none data-[state=active]:lg:border-b-2 data-[state=active]:border-b border-hope-orange data-[state=active]:lg:text-lg data-[state=active]:shadow-none"
              >
                Manage Users
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="data-[state=active]:text-hope-orange data-[state=active]:font-semibold rounded-none data-[state=active]:lg:border-b-2 data-[state=active]:border-b border-hope-orange data-[state=active]:lg:text-lg data-[state=active]:shadow-none"
              >
                Manage Reports
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
                        onChange={(e) => {
                          setFilteredCharities(
                            charities.filter((charity) =>
                              charity.charityName.toLowerCase().includes(e.target.value.toLowerCase())
                            )
                          );
                        }}
                        placeholder="Search charities..."
                        className="pl-9 pr-4 py-2 border rounded-md w-full md:w-80"
                      />
                    </div>
                    <div className="relative">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                      >
                        Filter
                      </Button>
                      {filterMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                          <ul>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setFilteredCharities(
                                  charities.filter((charity) => charity.status === "Pending")
                                );
                                setFilterMenuOpen(false);
                              }}
                            >
                              Pending
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setFilteredCharities(
                                  charities.filter((charity) => charity.status === "Approved")
                                );
                                setFilterMenuOpen(false);
                              }}
                            >
                              Approved
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setFilteredCharities(charities);
                                setFilterMenuOpen(false);
                              }}
                            >
                              All
                            </li>
                          </ul>
                        </div>
                      )}
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
                      {filteredCharities
                        .slice((currentCharityPage - 1) * itemsPerPage, currentCharityPage * itemsPerPage)
                        .map((charity) => (
                          <TableRow key={charity.id}>
                            <TableCell>{charity.id}</TableCell>
                            <TableCell>{charity.charityName}</TableCell>
                            <TableCell>{charity.email}</TableCell>
                            <TableCell>
                              <Badge
                                variant={charity.status === 'Approved' ? 'outline' : 'secondary'}
                                className={
                                  charity.status === 'Approved'
                                    ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                    : charity.status === 'Pending'
                                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                      : 'bg-red-100 text-red-800 hover:bg-red-100'
                                }
                              >
                                {charity.status.charAt(0).toUpperCase() + charity.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(charity.createAt).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, })}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewCharity(charity.id)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>

                                {charity.status === 'Pending' && (
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

                  <div className="flex justify-between items-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentCharityPage === 1}
                      onClick={() => setCurrentCharityPage((prev) => prev - 1)}
                    >
                      Previous
                    </Button>
                    <span>
                      Page {currentCharityPage} of {Math.ceil(filteredCharities.length / itemsPerPage)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentCharityPage === Math.ceil(filteredCharities.length / itemsPerPage)}
                      onClick={() => setCurrentCharityPage((prev) => prev + 1)}
                    >
                      Next
                    </Button>
                  </div>
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
                        onChange={(e) => {
                          handleSearchUser(e.target.value);
                        }}
                        placeholder="Search users..."
                        className="pl-9 pr-4 py-2 border rounded-md w-full md:w-80"
                      />
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.fullName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              {new Date(user.createAt).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, })}
                            </TableCell>
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

                  <div className="flex justify-between items-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      Previous
                    </Button>
                    <span>
                      Page {currentPage} of {Math.ceil(filteredUsers.length / itemsPerPage)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      Next
                    </Button>
                  </div>
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
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reports?.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>{report.id}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {report.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{report.reporterName}</TableCell>
                          <TableCell>{report.type}</TableCell>
                          <TableCell>{report.createdAt}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewReport(report.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
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
      </div >

      {/* View Dialog for Charity/User/Report details */}
      <Dialog open={viewDialogOpen} onOpenChange={handleOpenDialog} >
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
                    <p><strong>Name:</strong> {selectedCharity.charityName}</p>
                    <p><strong>Email:</strong> {selectedCharity.email}</p>
                    <p><strong>Status:</strong> {selectedCharity.status}</p>
                    <p><strong>Registration Date:</strong>
                      {new Date(selectedCharity.createAt).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, })}
                    </p>
                    <p><strong>Document Verified:</strong> {selectedCharity.status === "Approved" ? 'Yes' : 'No'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Verification Document</h3>
                  <div className="mt-2 p-4 border border-dashed rounded-md flex items-center justify-center">
                    <Link to={`https://ma3ansawa.runasp.net${selectedCharity.documentURL}`} target='_blank' className="flex items-center gap-2 border border-gray-400 rounded-lg py-2 px-4">
                      <FileText className="h-4 w-4" />
                      View Document
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {selectedUser && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">User Information</h3>
                  <div className="mt-2 space-y-2">
                    <p><strong>Name:</strong> {selectedUser.fullName}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Registration Date:</strong>
                      {new Date(selectedUser.createAt).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, })}
                    </p>
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
                    <p><strong>Reported by:</strong> {selectedReport.reporterName}</p>
                    <p><strong>Date:</strong> {selectedReport.createdAt}</p>
                    <p><strong>Reason:</strong> {selectedReport.reason}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">Reported Content</h3>
                  <div className="mt-2 p-4 border rounded-md bg-gray-50">
                    <p className="text-sm">{selectedReport.targetId}</p>
                  </div>
                </div>
              </div>
            )}
          </div>


          <DialogFooter>
            <Button variant="outline" onClick={handleOpenDialog}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Action Dialog */}
      <Dialog open={reportActionDialogOpen} onOpenChange={setReportActionDialogOpen} >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Take Action on Report</DialogTitle>
            <DialogDescription>
              Choose what action to take on this reported content
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={() => selectedReport && handleReportAction(selectedReport.targetId, selectedReport.type)}
              >
                <div className="flex flex-col">
                  <p className="font-medium ">Remove Content Only</p>
                  <p className="text-sm text-gray-500">Delete just the reported {selectedReport?.type}</p>
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
    </MainLayout >
  );
};

export default AdminDashboard;
