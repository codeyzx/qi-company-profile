<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Alert, AlertDescription } from "$lib/components/ui/alert";
  import {
    Phone,
    CheckCircle,
    AlertCircle,
    Mail,
    Clock,
    MapPin,
  } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import type { PageData, ActionData } from "./$types";

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let loading = $state(false);

</script>

<svelte:head>
  <title>Contact Info - Admin Dashboard</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold">Contact Information</h1>
      <p class="text-muted-foreground">Manage your contact details</p>
    </div>
  </div>

  {#if form?.success}
    <Alert class="border-green-500 bg-green-50">
      <CheckCircle class="h-4 w-4 text-green-600" />
      <AlertDescription class="text-green-800">
        {form.message}
      </AlertDescription>
    </Alert>
  {/if}

  {#if form?.error}
    <Alert class="border-red-500 bg-red-50">
      <AlertCircle class="h-4 w-4 text-red-600" />
      <AlertDescription class="text-red-800">
        {form.error}
      </AlertDescription>
    </Alert>
  {/if}

  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Phone class="size-5 text-jgYellow" />
        Contact Information
      </CardTitle>
    </CardHeader>
    <CardContent>
      <form method="POST" action="?/update" use:enhance class="space-y-8">
        {#if data.contactInfo}
          <input type="hidden" name="id" value={data.contactInfo.id} />
        {/if}

        <!-- Emails -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <Mail class="h-5 w-5 text-jgYellow" />
            <h3 class="text-lg font-semibold">Email Addresses</h3>
          </div>
          <div>
            <Label for="emails">Emails (one per line)</Label>
            <Textarea
              id="emails"
              name="emails"
              value={data.contactInfo?.emails?.join('\n') || ""}
              disabled={loading}
              rows={3}
              placeholder="hello@jelajahgame.com&#10;support@jelajahgame.com"
            />
            <p class="text-xs text-muted-foreground mt-1">
              Enter each email address on a new line
            </p>
          </div>
        </div>

        <!-- Phone Numbers -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <Phone class="h-5 w-5 text-jgYellow" />
            <h3 class="text-lg font-semibold">Phone Numbers</h3>
          </div>
          <div>
            <Label for="phone_numbers">Phone Numbers (one per line)</Label>
            <Textarea
              id="phone_numbers"
              name="phone_numbers"
              value={data.contactInfo?.phone_numbers?.join('\n') || ""}
              disabled={loading}
              rows={3}
              placeholder="+62 21 1234 5678&#10;+62 812 3456 7890"
            />
            <p class="text-xs text-muted-foreground mt-1">
              Enter each phone number on a new line
            </p>
          </div>
        </div>

        <!-- Social Links -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Social Media Links</h3>
          <div>
            <Label for="social_links">Social Links (JSON Format)</Label>
            <Textarea
              id="social_links"
              name="social_links"
              value={data.contactInfo?.social_links 
                ? JSON.stringify(data.contactInfo.social_links, null, 2) 
                : ""}
              disabled={loading}
              rows={6}
              placeholder={`{
  "instagram": "https://instagram.com/jelajahgame",
  "youtube": "https://youtube.com/@jelajahgame",
  "tiktok": "https://tiktok.com/@jelajahgame"
}`}
            />
            <p class="text-xs text-muted-foreground mt-1">
              Format: JSON object with platform name as key and URL as value
            </p>
          </div>
        </div>

        <!-- Operating Hours -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <Clock class="h-5 w-5 text-jgYellow" />
            <h3 class="text-lg font-semibold">Operating Hours</h3>
          </div>
          <div class="grid gap-4">
            <div>
              <Label for="operating_hours_id">Operating Hours (Indonesian)</Label>
              <Textarea
                id="operating_hours_id"
                name="operating_hours_id"
                value={data.contactInfo?.operating_hours_id || ""}
                disabled={loading}
                rows={4}
                placeholder="Senin - Jumat: 09:00 - 18:00 WIB&#10;Sabtu: 10:00 - 15:00 WIB&#10;Minggu: Libur"
              />
            </div>
            <div>
              <Label for="operating_hours_en">Operating Hours (English)</Label>
              <Textarea
                id="operating_hours_en"
                name="operating_hours_en"
                value={data.contactInfo?.operating_hours_en || ""}
                disabled={loading}
                rows={4}
                placeholder="Monday - Friday: 09:00 - 18:00 WIB&#10;Saturday: 10:00 - 15:00 WIB&#10;Sunday: Closed"
              />
            </div>
          </div>
        </div>

        <!-- Address -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <MapPin class="h-5 w-5 text-jgYellow" />
            <h3 class="text-lg font-semibold">Address (Optional)</h3>
          </div>
          <div class="grid gap-4">
            <div>
              <Label for="address_id">Address (Indonesian)</Label>
              <Textarea
                id="address_id"
                name="address_id"
                value={data.contactInfo?.address_id || ""}
                disabled={loading}
                rows={3}
                placeholder="Jl. Contoh No. 123, Jakarta, Indonesia"
              />
            </div>
            <div>
              <Label for="address_en">Address (English)</Label>
              <Textarea
                id="address_en"
                name="address_en"
                value={data.contactInfo?.address_en || ""}
                disabled={loading}
                rows={3}
                placeholder="123 Example Street, Jakarta, Indonesia"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <Button
            type="submit"
            class="bg-gradient-to-r from-jgYellow to-jgYellow/90 hover:from-jgYellow/90 hover:to-jgYellow text-black font-semibold"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Contact Information"}
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</div>
