<script lang="ts">
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import type { ComponentType } from "svelte";

  interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: ComponentType;
    trend?: {
      value: number;
      label: string;
      isPositive: boolean;
    };
    color?: "default" | "success" | "warning" | "danger";
  }

  let {
    title,
    value,
    description,
    icon: Icon,
    trend,
    color = "default",
  }: StatsCardProps = $props();

  const colorClasses = {
    default: "border-border",
    success: "border-green-200 bg-green-50/50",
    warning: "border-yellow-200 bg-yellow-50/50",
    danger: "border-red-200 bg-red-50/50",
  };

  const iconColors = {
    default: "text-muted-foreground",
    success: "text-green-600",
    warning: "text-yellow-600",
    danger: "text-red-600",
  };
</script>

<Card class="transition-all duration-200 hover:shadow-md {colorClasses[color]}">
  <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle class="text-sm font-medium text-muted-foreground">
      {title}
    </CardTitle>
    {#if Icon}
      <Icon class="h-4 w-4 {iconColors[color]}" />
    {/if}
  </CardHeader>
  <CardContent>
    <div class="text-2xl font-bold">{value}</div>
    {#if description}
      <p class="text-xs text-muted-foreground mt-1">
        {description}
      </p>
    {/if}
    {#if trend}
      <div class="flex items-center text-xs mt-2">
        <span
          class="font-medium {trend.isPositive
            ? 'text-green-600'
            : 'text-red-600'}"
        >
          {trend.isPositive ? "+" : ""}{trend.value}%
        </span>
        <span class="text-muted-foreground ml-1">{trend.label}</span>
      </div>
    {/if}
  </CardContent>
</Card>
