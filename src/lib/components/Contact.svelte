<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { Card, CardHeader, CardContent, CardFooter } from "$lib/components/ui/card";
  import { Label } from "$lib/components/ui/label";
  import { Input } from "$lib/components/ui/input";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Alert, AlertDescription, AlertTitle } from "$lib/components/ui/alert";
  import { AlertCircle, Mail, MessageCircle, Send } from "lucide-svelte";
  import { siteConfig } from "$lib/config/meta";
  import * as Select from "$lib/components/ui/select/index.js";

  interface ContactFormProps {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
  }

  let contactForm: ContactFormProps = {
    firstName: "",
    lastName: "",
    email: "",
    subject: "Pertanyaan Umum",
    message: "",
  };

  let invalidInputForm = false;

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const { firstName, lastName, email, subject, message } = contactForm;
    console.log(contactForm);

    const mailToLink = `mailto:hello@jelajahgame.com?subject=${subject}&body=Halo, saya ${firstName} ${lastName}, email saya ${email}. %0D%0A${message}`;
    window.location.href = mailToLink;
  }

  const subjects = [
    { value: "Pertanyaan Umum", label: "Pertanyaan Umum" },
    { value: "Kerja Sama", label: "Kerja Sama" },
    { value: "Submit Artikel", label: "Submit Artikel" },
    { value: "Laporan Bug", label: "Laporan Bug" },
    { value: "Saran & Kritik", label: "Saran & Kritik" }
  ];

  $: triggerContent = subjects.find(s => s.value === contactForm.subject)?.label ?? "Pilih subjek";
</script>

<section id="contact" class="container py-24 sm:py-32">
  <div class="text-center mb-12">
    <Badge variant="outline" class="mb-4 text-sm py-2 border-jgYellow/50">
      <MessageCircle class="size-4 mr-1 text-jgYellow" />
      <span class="text-jgYellow font-semibold">HUBUNGI KAMI</span>
    </Badge>
    <h2 class="text-3xl md:text-5xl font-bold mb-4">
      Ada Pertanyaan <span class="text-transparent bg-gradient-to-r from-jgYellow to-jgPurple bg-clip-text">?</span>
    </h2>
    <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
      Kami siap membantu Anda. Kirimkan pesan atau pertanyaan Anda dan tim kami akan segera merespons
    </p>
  </div>

  <section class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
    <div>
      <div class="space-y-6">
        <div class="bg-card p-6 rounded-xl border-2 border-jgYellow/20 hover:border-jgYellow/50 transition-all">
          <div class="flex gap-3 mb-3">
            <div class="bg-jgYellow/10 rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0">
              <Mail class="text-jgYellow size-6" />
            </div>
            <div>
              <div class="font-bold text-lg mb-1">Email Kami</div>
              <div class="text-muted-foreground">hello@jelajahgame.com</div>
              <div class="text-muted-foreground">support@jelajahgame.com</div>
            </div>
          </div>
        </div>

        <div class="bg-card p-6 rounded-xl border-2 border-jgPurple/20 hover:border-jgPurple/50 transition-all">
          <div class="flex gap-3 mb-3">
            <div class="bg-jgPurple/10 rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0">
              <MessageCircle class="text-jgPurple size-6" />
            </div>
            <div>
              <div class="font-bold text-lg mb-1">Sosial Media</div>
              <div class="space-y-1">
                <div>
                  <a 
                    href={siteConfig.links.instagram} 
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-jgYellow hover:underline"
                  >
                    @jelajahgame
                  </a>
                  <span class="text-muted-foreground"> di Instagram</span>
                </div>
                <div>
                  <a 
                    href={siteConfig.links.youtube} 
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-jgYellow hover:underline"
                  >
                    Jelajah Game
                  </a>
                  <span class="text-muted-foreground"> di YouTube</span>
                </div>
                <div>
                  <a 
                    href={siteConfig.links.tiktok} 
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-jgYellow hover:underline"
                  >
                    @jelajahgame
                  </a>
                  <span class="text-muted-foreground"> di TikTok</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-r from-jgYellow/10 to-jgPurple/10 p-6 rounded-xl border-2 border-jgYellow/20">
          <h3 class="font-bold text-lg mb-2">Jam Operasional</h3>
          <p class="text-muted-foreground mb-2">
            Tim kami aktif merespons email dan pesan sosial media:
          </p>
          <div class="space-y-1">
            <div><span class="font-semibold">Senin - Jumat:</span> 09:00 - 18:00 WIB</div>
            <div><span class="font-semibold">Sabtu:</span> 10:00 - 15:00 WIB</div>
            <div><span class="font-semibold">Minggu:</span> Libur</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form -->
    <Card class="bg-muted/60 dark:bg-card border-2 border-jgYellow/20">
      <CardHeader class="text-primary text-2xl" />
      <CardContent>
        <form on:submit={handleSubmit} class="grid gap-4">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-col w-full gap-1.5">
              <Label for="firstName">Nama Depan</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Ahmad"
                bind:value={contactForm.firstName}
                required
              />
            </div>

            <div class="flex flex-col w-full gap-1.5">
              <Label for="lastName">Nama Belakang</Label>
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
            <Label for="contactEmail">Email</Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="ahmad.joni@example.com"
              bind:value={contactForm.email}
              required
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <Label for="contactSubject">Subjek</Label>
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
            <Label for="contactMessage">Pesan</Label>
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

          <Button class="mt-4 bg-gradient-to-r from-jgYellow to-jgYellow/90 hover:from-jgYellow/90 hover:to-jgYellow text-black font-bold">
            <Send class="size-4 mr-2" />
            Kirim Pesan
          </Button>
        </form>
      </CardContent>
      <CardFooter />
    </Card>
  </section>
</section>
