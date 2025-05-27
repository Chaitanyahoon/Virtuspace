"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { User, Mail, Phone, MapPin, Calendar, Camera, Bell, Shield, Palette, Globe, Save } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "AR enthusiast and interior design lover. Always exploring new ways to visualize spaces.",
    website: "https://johndoe.com",
    joinDate: "January 2024",
  })

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true,
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }))
  }

  const handlePrivacyChange = (field: string, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Update your profile picture and display name</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button>
                      <Camera className="h-4 w-4 mr-2" />
                      Change Picture
                    </Button>
                    <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 5MB.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => handleProfileChange("name", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileChange("email", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleProfileChange("phone", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => handleProfileChange("location", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => handleProfileChange("website", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {profileData.joinDate}</span>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-updates">Email Updates</Label>
                      <p className="text-sm text-gray-500">Receive updates about your account via email</p>
                    </div>
                    <Switch
                      id="email-updates"
                      checked={notifications.emailUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("emailUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-gray-500">Receive emails about new features and promotions</p>
                    </div>
                    <Switch
                      id="marketing-emails"
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-digest">Weekly Digest</Label>
                      <p className="text-sm text-gray-500">Get a weekly summary of your activity</p>
                    </div>
                    <Switch
                      id="weekly-digest"
                      checked={notifications.weeklyDigest}
                      onCheckedChange={(checked) => handleNotificationChange("weeklyDigest", checked)}
                    />
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>Control who can see your information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="profile-public">Public Profile</Label>
                      <p className="text-sm text-gray-500">Make your profile visible to other users</p>
                    </div>
                    <Switch
                      id="profile-public"
                      checked={privacy.profilePublic}
                      onCheckedChange={(checked) => handlePrivacyChange("profilePublic", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-email">Show Email</Label>
                      <p className="text-sm text-gray-500">Display your email address on your profile</p>
                    </div>
                    <Switch
                      id="show-email"
                      checked={privacy.showEmail}
                      onCheckedChange={(checked) => handlePrivacyChange("showEmail", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-phone">Show Phone</Label>
                      <p className="text-sm text-gray-500">Display your phone number on your profile</p>
                    </div>
                    <Switch
                      id="show-phone"
                      checked={privacy.showPhone}
                      onCheckedChange={(checked) => handlePrivacyChange("showPhone", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allow-messages">Allow Messages</Label>
                      <p className="text-sm text-gray-500">Let other users send you direct messages</p>
                    </div>
                    <Switch
                      id="allow-messages"
                      checked={privacy.allowMessages}
                      onCheckedChange={(checked) => handlePrivacyChange("allowMessages", checked)}
                    />
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize how VirtuSpace looks for you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Theme</Label>
                    <p className="text-sm text-gray-500 mb-3">Choose your preferred theme</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="border rounded-lg p-3 cursor-pointer hover:border-purple-500">
                        <div className="w-full h-20 bg-white border rounded mb-2"></div>
                        <p className="text-sm text-center">Light</p>
                      </div>
                      <div className="border rounded-lg p-3 cursor-pointer hover:border-purple-500">
                        <div className="w-full h-20 bg-gray-900 border rounded mb-2"></div>
                        <p className="text-sm text-center">Dark</p>
                      </div>
                      <div className="border rounded-lg p-3 cursor-pointer hover:border-purple-500">
                        <div className="w-full h-20 bg-gradient-to-br from-white to-gray-900 border rounded mb-2"></div>
                        <p className="text-sm text-center">Auto</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Language</Label>
                    <p className="text-sm text-gray-500 mb-3">Select your preferred language</p>
                    <select className="w-full p-2 border rounded-md">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Japanese</option>
                    </select>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Appearance
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
