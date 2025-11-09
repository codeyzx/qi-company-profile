<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
  } from "$lib/components/ui/card";
  import { Label } from "$lib/components/ui/label";
  import { Input } from "$lib/components/ui/input";
  import { Textarea } from "$lib/components/ui/textarea";
  import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "$lib/components/ui/alert";
  import { AlertCircle, Mail, MessageCircle, Send } from "lucide-svelte";
  import { siteConfig } from "$lib/config/meta";
  import * as Select from "$lib/components/ui/select/index.js";
  import { locale } from "$lib/stores/locale";
  import { t } from "$lib/i18n";

  interface ContactData {
    emails?: string[];
    phone_numbers?: string[];
    social_links?: {
      instagram?: string;
      youtube?: string;
      tiktok?: string;
      twitter?: string;
      discord?: string;
    };
    operating_hours_id?: string;
    operating_hours_en?: string;
    address_id?: string;
    address_en?: string;
  }

  interface Props {
    contactData?: ContactData;
  }

  let { contactData }: Props = $props();

  // Helper function to get localized content
  function getLocalizedText(
    textId?: string,
    textEn?: string,
    fallback?: string
  ): string {
    if ($locale === "en") {
      return textEn || textId || fallback || "";
    }
    return textId || textEn || fallback || "";
  }

  const emails = $derived(
    contactData?.emails || ["hello@jelajahgame.com", "support@jelajahgame.com"]
  );
  const socialLinks = $derived(
    contactData?.social_links || {
      instagram: siteConfig.links.instagram,
      youtube: siteConfig.links.youtube,
      tiktok: siteConfig.links.tiktok,
    }
  );
  const operatingHours = $derived(
    getLocalizedText(
      contactData?.operating_hours_id,
      contactData?.operating_hours_en,
      "Senin - Jumat: 09:00 - 18:00 WIB<br>Sabtu: 10:00 - 15:00 WIB<br>Minggu: Libur"
    )
  );

  interface ContactFormProps {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
  }

  let contactForm: ContactFormProps = $state({
    firstName: "",
    lastName: "",
    email: "",
    subject: "general",
    message: "",
  });

  let invalidInputForm = false;

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const { firstName, lastName, email, subject, message } = contactForm;
    console.log(contactForm);

    const primaryEmail = emails[0] || "hello@jelajahgame.com";
    const mailToLink = `mailto:${primaryEmail}?subject=${subject}&body=Halo, saya ${firstName} ${lastName}, email saya ${email}. %0D%0A${message}`;
    window.location.href = mailToLink;
  }

  const subjects = $derived([
    { value: "general", label: $t("contact.form.subjects.general") },
    { value: "partnership", label: $t("contact.form.subjects.partnership") },
    {
      value: "submitArticle",
      label: $t("contact.form.subjects.submitArticle"),
    },
    { value: "bugReport", label: $t("contact.form.subjects.bugReport") },
    { value: "feedback", label: $t("contact.form.subjects.feedback") },
  ]);

  const triggerContent = $derived(
    subjects.find((s) => s.value === contactForm.subject)?.label ??
      $t("contact.form.selectSubject")
  );
</script>

<section id="contact" class="container py-24 sm:py-32">
  <div class="text-center mb-12">
    <Badge variant="outline" class="mb-4 text-sm py-2 border-jgYellow/50">
      <MessageCircle class="size-4 mr-1 text-jgYellow" />
      <span class="text-jgYellow font-semibold">{$t("contact.badge")}</span>
    </Badge>
    <h2 class="text-3xl md:text-5xl font-bold mb-4">
      {$t("contact.title")}
      <span
        class="text-transparent bg-gradient-to-r from-jgYellow to-jgPurple bg-clip-text"
        >?</span
      >
    </h2>
    <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
      {$t("contact.description")}
    </p>
  </div>

  <section class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
    <div>
      <div class="space-y-6">
        <div
          class="bg-card p-6 rounded-xl border-2 border-jgYellow/20 hover:border-jgYellow/50 transition-all"
        >
          <div class="flex gap-3 mb-3">
            <div
              class="bg-jgYellow/10 rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0"
            >
              <Mail class="text-jgYellow size-6" />
            </div>
            <div>
              <div class="font-bold text-lg mb-1">{$t("contact.email")}</div>
              {#each emails as email}
                <div class="text-muted-foreground">{email}</div>
              {/each}
            </div>
          </div>
        </div>

        <div
          class="bg-card p-6 rounded-xl border-2 border-jgPurple/20 hover:border-jgPurple/50 transition-all"
        >
          <div class="flex gap-3 mb-3">
            <div
              class="bg-jgPurple/10 rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0"
            >
              <MessageCircle class="text-jgPurple size-6" />
            </div>
            <div>
              <div class="font-bold text-lg mb-1">
                {$t("contact.socialMedia")}
              </div>
              <div class="space-y-1">
                {#if socialLinks.instagram}
                  <div>
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-jgYellow hover:underline"
                    >
                      @jelajahgame
                    </a>
                    <span class="text-muted-foreground"> di Instagram</span>
                  </div>
                {/if}
                {#if socialLinks.youtube}
                  <div>
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-jgYellow hover:underline"
                    >
                      Jelajah Game
                    </a>
                    <span class="text-muted-foreground"> di YouTube</span>
                  </div>
                {/if}
                {#if socialLinks.tiktok}
                  <div>
                    <a
                      href={socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-jgYellow hover:underline"
                    >
                      @jelajahgame
                    </a>
                    <span class="text-muted-foreground"> di TikTok</span>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-gradient-to-r from-jgYellow/10 to-jgPurple/10 p-6 rounded-xl border-2 border-jgYellow/20"
        >
          <h3 class="font-bold text-lg mb-2">{$t("contact.operatingHours")}</h3>
          <p class="text-muted-foreground mb-2">
            Tim kami aktif merespons email dan pesan sosial media:
          </p>
          <div class="space-y-1">
            {@html operatingHours}
          </div>
        </div>
      </div>
    </div>

    <!-- Form -->
    <Card class="bg-muted/60 dark:bg-card border-2 border-jgYellow/20">
      <CardHeader class="text-primary text-2xl" />
      <CardContent>
        <form onsubmit={handleSubmit} class="grid gap-4">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-col w-full gap-1.5">
              <Label for="firstName">{$t("contact.form.firstName")}</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Ahmad"
                bind:value={contactForm.firstName}
                required
              />
            </div>

            <div class="flex flex-col w-full gap-1.5">
              <Label for="lastName">{$t("contact.form.lastName")}</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Joni"
                bind:value={contactForm.lastName}
                required
              />
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <Label for="contactEmail">{$t("contact.form.email")}</Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="ahmad.joni@example.com"
              bind:value={contactForm.email}
              required
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <Label for="contactSubject">{$t("contact.form.subject")}</Label>
            <Select.Root type="single" bind:value={contactForm.subject}>
              <Select.Trigger id="contactSubject" class="w-full">
                {triggerContent}
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {#each subjects as subject}
                    <Select.Item value={subject.value} label={subject.label}>
                      {subject.label}
                    </Select.Item>
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>

          <div class="flex flex-col gap-1.5">
            <Label for="contactMessage">{$t("contact.form.message")}</Label>
            <Textarea
              id="contactMessage"
              placeholder="Tulis pesan Anda di sini..."
              rows={5}
              bind:value={contactForm.message}
              required
            />
          </div>

          {#if invalidInputForm}
            <Alert variant="destructive">
              <AlertCircle class="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Ada kesalahan dalam form. Silakan periksa input Anda.
              </AlertDescription>
            </Alert>
          {/if}

          <Button
            class="mt-4 bg-gradient-to-r from-jgYellow to-jgYellow/90 hover:from-jgYellow/90 hover:to-jgYellow text-black font-bold"
          >
            <Send class="size-4 mr-2" />
            {$t("contact.form.send")}
          </Button>
        </form>
      </CardContent>
      <CardFooter />
    </Card>
  </section>
</section>
