<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { Card } from "$lib/components/ui/card";
  import { ArrowRight, Sparkles } from "lucide-svelte";
  import { getIconComponent } from "$lib/utils/icons";
  import { t } from "$lib/i18n";
  import { locale } from "$lib/stores/locale";
  import type { Database } from "$lib/database.types";

  type GameCategory = Database["public"]["Tables"]["game_categories"]["Row"];

  interface Props {
    categories: GameCategory[];
  }

  let { categories }: Props = $props();

  // Helper function to generate gradient classes from hex colors
  function generateGradientClasses(from: string, to: string) {
    return `from-[${from}]/10 to-[${to}]/5`;
  }

  function generateBorderClasses(from: string) {
    return `border-[${from}]/30 hover:border-[${from}]/60`;
  }

  function generateIconBgClasses(from: string, to: string) {
    return `bg-gradient-to-br from-[${from}]/20 to-[${to}]/30`;
  }

  function generateHoverGradient(from: string, to: string) {
    return `hover:from-[${from}]/20 hover:to-[${to}]/10`;
  }

  function generateGlowEffect(from: string) {
    return `hover:shadow-[0_0_30px_${from}30]`;
  }
</script>

<section id="kategori" class="relative py-24 md:py-32 overflow-hidden">
  <div class="container relative z-10">
    <div class="text-center mb-16">
      <Badge
        variant="outline"
        class="mb-6 text-sm py-3 px-6 border-jgPurple/30 bg-background/80 backdrop-blur-sm hover:bg-jgPurple/10 transition-all duration-300"
      >
        <Sparkles class="size-4 mr-2 text-jgPurple animate-pulse" />
        <span class="text-jgPurple font-bold tracking-wide"
          >{$t("categories.title")}</span
        >
      </Badge>
      <h2
        class="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
      >
        <span class="block mb-2">{$t("categories.subtitle")}</span>
        <span
          class="text-transparent bg-gradient-to-r from-jgYellow via-orange-400 to-jgPurple bg-clip-text animate-gradient font-extrabold"
          >Premium</span
        >
      </h2>
      <p
        class="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium"
      >
        {$t("categories.description")}
      </p>

      <!-- Stats counter -->
      <div class="flex justify-center items-center gap-8 mt-8 flex-wrap">
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-jgYellow">4+</div>
          <div class="text-sm text-muted-foreground font-medium">Kategori</div>
        </div>
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-jgPurple">1000+</div>
          <div class="text-sm text-muted-foreground font-medium">Konten</div>
        </div>
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-orange-500">24/7</div>
          <div class="text-sm text-muted-foreground font-medium">Update</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {#each categories as category, index}
        {@const IconComponent = getIconComponent(category.icon || "Gamepad2")}
        {@const gradientClasses = generateGradientClasses(
          category.gradient_from,
          category.gradient_to
        )}
        {@const borderClasses = generateBorderClasses(category.gradient_from)}
        {@const iconBgClasses = generateIconBgClasses(
          category.gradient_from,
          category.gradient_to
        )}
        {@const hoverGradient = generateHoverGradient(
          category.gradient_from,
          category.gradient_to
        )}
        {@const glowEffect = generateGlowEffect(category.gradient_from)}
        {@const currentLocale = $locale}
        {@const title =
          currentLocale === "id" ? category.title_id : category.title_en}
        {@const description =
          currentLocale === "id"
            ? category.description_id
            : category.description_en}
        {@const badge =
          currentLocale === "id" ? category.badge_id : category.badge_en}
        {@const countText =
          currentLocale === "id"
            ? category.count_text_id
            : category.count_text_en}

        <Card
          class={`group relative overflow-hidden border-2 ${borderClasses} bg-gradient-to-br ${gradientClasses} ${hoverGradient} backdrop-blur-sm hover:shadow-2xl ${glowEffect} transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] cursor-pointer animate-fade-in-up`}
          style="animation-delay: {index * 100}ms"
        >
          <!-- Animated background pattern -->
          <div
            class="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
          >
            <div
              class="absolute inset-0"
              style="background-image: radial-gradient(circle at 20% 50%, {category.gradient_from} 20%, transparent 21%), radial-gradient(circle at 80% 50%, {category.gradient_to} 20%, transparent 21%); background-size: 30px 30px;"
            ></div>
          </div>

          <div class="relative z-10 p-8 md:p-10">
            <!-- Icon & Badge -->
            <div class="flex items-start justify-between mb-6">
              <div
                class={`${iconBgClasses} rounded-2xl w-20 h-20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
              >
                <IconComponent class="size-10 text-foreground drop-shadow-sm" />
              </div>
              {#if badge}
                <Badge
                  class="bg-background/90 text-foreground font-bold px-4 py-2 text-sm backdrop-blur-sm border border-white/20 shadow-lg"
                >
                  <Sparkles class="size-3 mr-1" />
                  {badge}
                </Badge>
              {/if}
            </div>

            <!-- Title -->
            <h3
              class="font-black text-3xl md:text-4xl mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text transition-all duration-500 leading-tight"
            >
              {title}
            </h3>

            <!-- Description -->
            <p
              class="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300"
            >
              {description}
            </p>

            <!-- Stats & CTA -->
            <div
              class="flex items-center justify-between pt-6 border-t border-white/10"
            >
              {#if countText}
                <div class="flex items-center gap-2">
                  <div
                    class="w-2 h-2 rounded-full"
                    style="background-color: {category.gradient_from}"
                  ></div>
                  <span class="text-base font-bold text-foreground/90">
                    {countText}
                  </span>
                </div>
              {:else}
                <span></span>
              {/if}
              <div
                class="flex items-center gap-3 text-base font-bold text-white bg-gradient-to-r from-jgYellow to-orange-500 px-6 py-3 rounded-full group-hover:gap-4 group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {$t("categories.viewContent")}
                <ArrowRight
                  class="size-5 group-hover:translate-x-1 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          <!-- Enhanced decorative elements -->
          <div
            class="absolute -right-12 -bottom-12 w-40 h-40 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700 opacity-20 group-hover:opacity-40"
            style="background: radial-gradient(circle, {category.gradient_from}, {category.gradient_to})"
          ></div>
          <div
            class="absolute -left-8 -top-8 w-24 h-24 rounded-full blur-2xl group-hover:scale-125 transition-all duration-500 opacity-10"
            style="background-color: {category.gradient_to}"
          ></div>

          <!-- Hover shimmer effect -->
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          >
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"
            ></div>
          </div>
        </Card>
      {/each}
    </div>

    <!-- Enhanced CTA Section -->
    <div class="text-center mt-16">
      <div class="relative inline-block">
        <div
          class="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-jgYellow/20 via-orange-500/20 to-jgPurple/20 border-2 border-jgYellow/40 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-jgYellow/20"
        >
          <div class="relative">
            <Sparkles
              class="size-6 text-jgYellow animate-spin"
              style="animation-duration: 3s"
            />
            <div
              class="absolute inset-0 bg-jgYellow/30 rounded-full animate-ping"
            ></div>
          </div>
          <span
            class="font-black text-xl bg-gradient-to-r from-jgYellow to-orange-500 bg-clip-text text-transparent"
          >
            {$t("categories.totalContent")}
          </span>
          <div class="w-2 h-2 bg-jgYellow rounded-full animate-pulse"></div>
        </div>

        <!-- Floating particles -->
        <div
          class="absolute -top-2 -left-2 w-4 h-4 bg-jgYellow/50 rounded-full animate-bounce"
          style="animation-delay: 0s; animation-duration: 2s"
        ></div>
        <div
          class="absolute -bottom-2 -right-2 w-3 h-3 bg-jgPurple/50 rounded-full animate-bounce"
          style="animation-delay: 1s; animation-duration: 2.5s"
        ></div>
        <div
          class="absolute top-1/2 -right-6 w-2 h-2 bg-orange-500/50 rounded-full animate-bounce"
          style="animation-delay: 0.5s; animation-duration: 1.8s"
        ></div>
      </div>
    </div>
  </div>
</section>
