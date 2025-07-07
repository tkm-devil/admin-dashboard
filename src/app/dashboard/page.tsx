// src/app/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$54,321</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">+3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+16% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Testing Layout Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Sidebar Tests:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Click collapse/expand button</li>
                <li>✓ Navigate between menu items</li>
                <li>✓ Check active state highlighting</li>
                <li>✓ Test responsive behavior</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Topbar Tests:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Theme toggle functionality</li>
                <li>✓ Notifications dropdown</li>
                <li>✓ User profile dropdown</li>
                <li>✓ Search input interaction</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interactive Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Use these buttons to test various interactions:
            </p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Test Button</Button>
              <Button size="sm" variant="outline">Outline Button</Button>
              <Button size="sm" variant="secondary">Secondary</Button>
              <Button size="sm" variant="destructive">Destructive</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}