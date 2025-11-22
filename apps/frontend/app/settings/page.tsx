"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import AppHeader from "../../components/layout/AppHeader";
import Footer from "../../components/layout/Footer";

export default function SettingsPage() {
  return (
    <main>
      <AppHeader />
      <div className="container-padded py-10">
        <Card>
          <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
          <CardContent className="grid gap-3 sm:max-w-md">
            <Input placeholder="Name" defaultValue="Jane Doe" />
            <Input placeholder="Email" defaultValue="jane@nutrisync.app" />
            <Button>Save</Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </main>
  );
}
