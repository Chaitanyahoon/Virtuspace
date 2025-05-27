"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, HelpCircle, Book, Video, MessageCircle, Mail, Phone, ExternalLink, ArrowRight } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

const faqData = [
  {
    question: "How do I start an AR session?",
    answer:
      "To start an AR session, click the 'Start AR Experience' button on the homepage or dashboard. Make sure your device supports WebXR and grant camera permissions when prompted.",
  },
  {
    question: "What devices support VirtuSpace AR?",
    answer:
      "VirtuSpace works on modern smartphones and tablets with WebXR support. This includes most recent Android devices with Chrome browser and iOS devices with Safari 14.5+.",
  },
  {
    question: "How do I upload my own 3D models?",
    answer:
      "Go to the Upload page from your dashboard. We support GLB, GLTF, OBJ, and FBX formats. Make sure your model is optimized for web use (under 50MB) for the best experience.",
  },
  {
    question: "Can I share my AR sessions with others?",
    answer:
      "Yes! You can make your AR sessions public and share them with others. Use the share button in your session to generate a link that others can view.",
  },
  {
    question: "Is VirtuSpace free to use?",
    answer:
      "VirtuSpace offers both free and premium features. Basic AR functionality and model library access is free. Premium features include unlimited uploads, advanced sharing options, and priority support.",
  },
  {
    question: "How do I improve AR tracking quality?",
    answer:
      "For best results, ensure good lighting, point your camera at textured surfaces, and move slowly when placing objects. Avoid reflective surfaces and areas with poor lighting.",
  },
]

const helpCategories = [
  {
    title: "Getting Started",
    description: "Learn the basics of VirtuSpace",
    icon: Book,
    articles: 12,
    color: "bg-blue-500",
  },
  {
    title: "AR Features",
    description: "Master AR placement and interaction",
    icon: Video,
    articles: 8,
    color: "bg-purple-500",
  },
  {
    title: "Model Management",
    description: "Upload and organize your 3D models",
    icon: HelpCircle,
    articles: 6,
    color: "bg-green-500",
  },
  {
    title: "Troubleshooting",
    description: "Solve common issues",
    icon: MessageCircle,
    articles: 15,
    color: "bg-orange-500",
  },
]

export default function HelpPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to your questions and learn how to make the most of VirtuSpace
          </p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input placeholder="Search for help articles, tutorials, or FAQs..." className="pl-10 text-lg h-12" />
            </div>
          </CardContent>
        </Card>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {helpCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${category.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                      <p className="text-gray-600 mb-3">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{category.articles} articles</Badge>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Video className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">Watch step-by-step guides</p>
              <Button variant="outline" className="w-full">
                Watch Tutorials
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Book className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Documentation</h3>
              <p className="text-gray-600 mb-4">Detailed technical guides</p>
              <Button variant="outline" className="w-full">
                Read Docs
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Community</h3>
              <p className="text-gray-600 mb-4">Connect with other users</p>
              <Button variant="outline" className="w-full">
                Join Community
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Still need help?</CardTitle>
            <CardDescription>Get in touch with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-600">support@virtuspace.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-gray-600">Available 9 AM - 6 PM PST</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Button className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Live Chat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
