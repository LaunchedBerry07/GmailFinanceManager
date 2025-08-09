import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Mail, Building, Phone } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  emailCount: number;
  totalAmount: number;
  lastEmailDate: Date;
}

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for contacts (Phase 7 requirements)
  const contacts: Contact[] = [
    {
      id: "1",
      name: "Amazon Services",
      email: "orders@amazon.com",
      company: "Amazon",
      emailCount: 15,
      totalAmount: 1245.67,
      lastEmailDate: new Date("2024-08-08"),
    },
    {
      id: "2", 
      name: "Netflix Support",
      email: "billing@netflix.com",
      company: "Netflix Inc.",
      emailCount: 3,
      totalAmount: 45.97,
      lastEmailDate: new Date("2024-08-05"),
    },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-primary-800">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <main className="flex-1 overflow-auto p-6 bg-primary-900/50">
          {/* Page Header */}
          <div className="gradient-card rounded-2xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">Financial Contacts</h1>
                <p className="text-purple-300">Manage senders and companies from your financial emails</p>
              </div>
              
              <Button className="gradient-pink-magenta text-white action-btn">
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </div>
          </div>

          {/* Contacts Grid */}
          <div className="gradient-card rounded-2xl overflow-hidden">
            {filteredContacts.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 gradient-cyan-blue rounded-2xl flex items-center justify-center">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Contacts Found</h3>
                <p className="text-purple-300 mb-6">
                  {searchQuery ? "No contacts match your search criteria." : "Contacts will appear here as you receive financial emails."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary-600/30 backdrop-blur-sm">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Emails</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Total Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Last Email</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary-600/20">
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-primary-600/10 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {contact.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="text-white font-medium">{contact.name}</div>
                              <div className="text-purple-300 text-sm flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                {contact.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-purple-300">
                            <Building className="w-4 h-4 mr-2" />
                            {contact.company || "—"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="px-3 py-1 bg-primary-600/50 rounded-full">
                              <span className="text-white text-sm font-medium">{contact.emailCount}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-white font-semibold">
                            ${contact.totalAmount.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-purple-300">
                            {contact.lastEmailDate.toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-2 text-purple-300 hover:text-accent-pink action-btn"
                            >
                              <Mail className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-2 text-purple-300 hover:text-accent-cyan action-btn"
                            >
                              <Phone className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}