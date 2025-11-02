"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/button";
import { useToast } from "@/components/toast-provider";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Please share your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z
    .string()
    .min(6, "Phone number should include country code if possible.")
    .optional()
    .or(z.literal("")),
  message: z.string().min(10, "Let us know what you would like to discuss."),
  source: z.string().default("website"),
  reason: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm({ className }: { className?: string }) {
  const { showToast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      source: "website",
      reason: "",
    },
  });

  useEffect(() => {
    const handleReason = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      form.setValue("reason", customEvent.detail);
    };
    window.addEventListener("contact:reason", handleReason);
    return () => window.removeEventListener("contact:reason", handleReason);
  }, [form]);

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to send enquiry.");
      }
      form.reset({ ...form.getValues(), message: "" });
      showToast({
        title: "Message sent!",
        description: "Our team will reach out within one business day.",
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      showToast({
        title: "Something went wrong.",
        description:
          "We could not send your message. Please try again or reach us via WhatsApp.",
        variant: "error",
      });
    }
  });

  return (
    <form
      className={cn(
        "grid gap-6 rounded-3xl border border-brand-50 bg-white/80 p-8 shadow-subtle md:grid-cols-2 md:p-12",
        className,
      )}
      onSubmit={onSubmit}
    >
      <div className="space-y-4">
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Full name
        </label>
        <input
          id="name"
          type="text"
          className="h-12 rounded-xl border border-brand-100 bg-white px-4 text-sm text-ink outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
          placeholder="Ada Okafor"
          {...form.register("name")}
        />
        <FieldError message={form.formState.errors.name?.message} />
      </div>

      <div className="space-y-4">
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="h-12 rounded-xl border border-brand-100 bg-white px-4 text-sm text-ink outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
          placeholder="hello@chromaland.com"
          {...form.register("email")}
        />
        <FieldError message={form.formState.errors.email?.message} />
      </div>

      <div className="space-y-4">
        <label htmlFor="phone" className="block text-sm font-medium text-ink">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          className="h-12 rounded-xl border border-brand-100 bg-white px-4 text-sm text-ink outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
          placeholder="+234 800 000 0000"
          {...form.register("phone")}
        />
        <FieldError message={form.formState.errors.phone?.message} />
      </div>

      <div className="space-y-4 md:col-span-2">
        <label htmlFor="message" className="block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
          placeholder="Tell us about your goals, timelines, and any questions you have."
          {...form.register("message")}
        />
        <FieldError message={form.formState.errors.message?.message} />
      </div>

      <input type="hidden" {...form.register("source")} />
      <input type="hidden" {...form.register("reason")} />

      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted">
          We&apos;ll get back to you within 1 business day.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Sending..." : "Send Message"}
          </Button>
          <a
            href="https://wa.me/2348000000000?text=Hi%20Chromaland!%20I%27d%20love%20to%20learn%20more%20about%20Plot%20610%20Terraces."
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "ghost", size: "md" }))}
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-rose-500">{message}</p>;
}
