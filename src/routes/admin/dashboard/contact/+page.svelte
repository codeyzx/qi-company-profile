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
  import { Badge } from "$lib/components/ui/badge";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "$lib/components/ui/dialog";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "$lib/components/ui/table";
  import { Alert, AlertDescription } from "$lib/components/ui/alert";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import {
    Plus,
    Edit,
    Trash2,
    Phone,
    CheckCircle,
    AlertCircle,
    Mail,
    MapPin,
    Globe,
    MessageCircle,
  } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import type { PageData, ActionData } from "./$types";

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let showCreateDialog = $state(false);
  let editingContact = $state<any>(null);
  let loading = $state(false);
  let selectedType = $state("");
  let isPublic = $state(false);

  const contactTypes = [
    { value: "email", label: "Email", icon: Mail },
    { value: "phone", label: "Phone", icon: Phone },
    { value: "address", label: "Address", icon: MapPin },
    { value: "website", label: "Website", icon: Globe },
    { value: "social", label: "Social Media", icon: MessageCircle },
  ];

  function resetForm() {
    showCreateDialog = false;
    editingContact = null;
    selectedType = "";
    isPublic = false;
  }

  function startEdit(contact: any) {
    editingContact = { ...contact };
    selectedType = contact.contact_type;
    isPublic = contact.is_public;
    showCreateDialog = true;
  }

  function getContactIcon(type: string) {
    const contactType = contactTypes.find((t) => t.value === type);
    return contactType?.icon || Phone;
  }

  function getContactTypeLabel(type: string) {
    const contactType = contactTypes.find((t) => t.value === type);
    return contactType?.label || type;
  }
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

    <Dialog bind:open={showCreateDialog} onOpenChange={resetForm}>
      <DialogTrigger>
        <Button
          class="bg-gradient-to-r from-jgYellow to-jgYellow/90 hover:from-jgYellow/90 hover:to-jgYellow text-black font-semibold"
        >
          <Plus class="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </DialogTrigger>
      <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingContact ? "Edit Contact Info" : "Create New Contact Info"}
          </DialogTitle>
        </DialogHeader>

        <form
          method="POST"
          action={editingContact ? "?/update" : "?/create"}
          use:enhance
        >
          {#if editingContact}
            <input type="hidden" name="id" value={editingContact.id} />
          {/if}

          <div class="space-y-6">
            <!-- Contact Type and Settings -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Settings</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label for="contact_type">Contact Type</Label>
                  <select
                    name="contact_type"
                    bind:value={selectedType}
                    disabled={loading}
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select contact type</option>
                    {#each contactTypes as type}
                      <option value={type.value}>{type.label}</option>
                    {/each}
                  </select>
                </div>

                <div>
                  <Label for="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    name="display_order"
                    type="number"
                    value={editingContact?.display_order || 0}
                    disabled={loading}
                    min="0"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label for="icon">Icon (Lucide name)</Label>
                  <Input
                    id="icon"
                    name="icon"
                    value={editingContact?.icon || ""}
                    disabled={loading}
                    placeholder="e.g., Phone, Mail, MapPin"
                  />
                </div>

                <div class="flex items-center space-x-2 mt-6">
                  <Checkbox
                    id="is_public"
                    name="is_public"
                    checked={isPublic}
                    onCheckedChange={(checked) => (isPublic = checked)}
                  />
                  <Label for="is_public">Public (visible to visitors)</Label>
                </div>
              </div>
            </div>

            <!-- Indonesian Fields -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Indonesian Content</h3>
              <div>
                <Label for="label_id">Label (Indonesian)</Label>
                <Input
                  id="label_id"
                  name="label_id"
                  value={editingContact?.label_id || ""}
                  required
                  disabled={loading}
                  placeholder="e.g., Telepon, Email, Alamat"
                />
              </div>
            </div>

            <!-- English Fields -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">English Content</h3>
              <div>
                <Label for="label_en">Label (English)</Label>
                <Input
                  id="label_en"
                  name="label_en"
                  value={editingContact?.label_en || ""}
                  required
                  disabled={loading}
                  placeholder="e.g., Phone, Email, Address"
                />
              </div>
            </div>

            <!-- Contact Value and Link -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Contact Details</h3>
              <div>
                <Label for="value">Contact Value</Label>
                <Input
                  id="value"
                  name="value"
                  value={editingContact?.value || ""}
                  required
                  disabled={loading}
                  placeholder="e.g., +62123456789, hello@company.com, Street Address"
                />
              </div>

              <div>
                <Label for="link_url">Link URL (optional)</Label>
                <Input
                  id="link_url"
                  name="link_url"
                  value={editingContact?.link_url || ""}
                  disabled={loading}
                  placeholder="e.g., tel:+62123456789, mailto:hello@company.com"
                />
              </div>
            </div>

            <div class="flex justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onclick={resetForm}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                class="bg-jgYellow hover:bg-jgYellow/90 text-black"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editingContact
                    ? "Update Contact"
                    : "Create Contact"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
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
        Contact Information ({data.contactInfo.length})
      </CardTitle>
    </CardHeader>
    <CardContent>
      {#if data.contactInfo.length === 0}
        <div class="text-center py-12">
          <Phone class="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p class="mt-4 text-lg font-medium">No contact info yet</p>
          <p class="text-muted-foreground">
            Add your first contact information to get started.
          </p>
        </div>
      {:else}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {#each data.contactInfo as contact}
              <TableRow>
                <TableCell>
                  <div class="flex items-center gap-2">
                    {#each [getContactIcon(contact.contact_type)] as IconComponent}
                      <IconComponent class="h-5 w-5 text-jgYellow" />
                    {/each}
                    <div>
                      <p class="font-medium">{contact.label_en}</p>
                      <p class="text-sm text-muted-foreground">
                        {contact.label_id}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline"
                    >{getContactTypeLabel(contact.contact_type)}</Badge
                  >
                </TableCell>
                <TableCell>
                  {#if contact.link_url}
                    <a
                      href={contact.link_url}
                      class="text-blue-600 hover:underline"
                    >
                      {contact.value}
                    </a>
                  {:else}
                    {contact.value}
                  {/if}
                </TableCell>
                <TableCell>{contact.display_order}</TableCell>
                <TableCell>
                  <Badge variant={contact.is_public ? "default" : "secondary"}>
                    {contact.is_public ? "Public" : "Private"}
                  </Badge>
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onclick={() => startEdit(contact)}
                    >
                      <Edit class="h-4 w-4" />
                    </Button>
                    <form method="POST" action="?/delete" use:enhance>
                      <input type="hidden" name="id" value={contact.id} />
                      <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        class="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onclick={(e) => {
                          if (
                            !confirm(
                              "Are you sure you want to delete this contact info?"
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <Trash2 class="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            {/each}
          </TableBody>
        </Table>
      {/if}
    </CardContent>
  </Card>
</div>
