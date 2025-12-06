"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { ProviderAvailability } from "@/components/scheduling/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const emptyState = (
  <div className="rounded-2xl border border-dark-400 bg-white/70 p-6 text-center text-sm text-dark-500">
    No providers have published availability yet.
  </div>
);

type SelectedSlot = {
  providerId: string;
  time: string;
};

type TimeSlotPickerProps = {
  availabilities: ProviderAvailability[];
};

const TimeSlotPicker = ({ availabilities }: TimeSlotPickerProps) => {
  const [activeProviderId, setActiveProviderId] = useState(
    () => availabilities[0]?.id ?? "",
  );
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);

  const activeProvider = useMemo(
    () => availabilities.find((provider) => provider.id === activeProviderId),
    [activeProviderId, availabilities],
  );

  const availableSlotCount =
    activeProvider?.slots.filter((slot) => slot.isAvailable).length ?? 0;

  if (!availabilities.length) return emptyState;

  const handleSlotSelection = (time: string, isAvailable: boolean) => {
    if (!activeProvider || !isAvailable) return;

    setSelectedSlot({ providerId: activeProvider.id, time });
  };

  const handleProviderChange = (providerId: string) => {
    setActiveProviderId(providerId);

    if (selectedSlot?.providerId !== providerId) {
      setSelectedSlot(null);
    }
  };

  return (
    <section className="rounded-3xl border border-dark-400 bg-white/80 p-6 shadow-lg shadow-dark-500/5">
      <div className="flex flex-col gap-1 text-left">
        <p className="text-sm text-dark-500">Pick a time</p>
        <h2 className="text-2xl font-semibold text-dark-900">Provider availability</h2>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <p className="text-sm text-dark-500">
            Choose a provider to preview upcoming time slots.
          </p>
          {selectedSlot && activeProvider && (
            <div className="text-right text-sm text-dark-900">
              <p className="font-medium">Selected slot</p>
              <p className="text-primary-500">
                {selectedSlot.time} with {activeProvider.name}
              </p>
            </div>
          )}
        </div>

        <div className="-mx-1 flex gap-3 overflow-x-auto pb-2">
          {availabilities.map((provider) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => handleProviderChange(provider.id)}
              className={cn(
                "flex min-w-[230px] items-center gap-3 rounded-2xl border px-3 py-3 text-left transition",
                activeProvider?.id === provider.id
                  ? "border-primary-500 bg-primary-50"
                  : "border-dark-300 bg-white hover:border-primary-300",
              )}
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-dark-300">
                <Image
                  src={provider.avatar}
                  alt={provider.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <span>
                <p className="font-semibold text-dark-900">{provider.name}</p>
                <p className="text-sm text-dark-500">{provider.specialty}</p>
              </span>
            </button>
          ))}
        </div>

        {activeProvider ? (
          <div className="rounded-2xl border border-dark-300 bg-white/90 p-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-sm text-dark-500">Next availability</p>
                <p className="font-semibold text-dark-900">
                  {activeProvider.day} · {activeProvider.location}
                </p>
              </div>
              <p className="text-sm text-dark-500">
                {availableSlotCount} {availableSlotCount === 1 ? "slot" : "slots"} open
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
              {activeProvider.slots.map((slot) => {
                const isSelected =
                  !!selectedSlot &&
                  selectedSlot.providerId === activeProvider.id &&
                  selectedSlot.time === slot.time;

                return (
                  <Button
                    key={`${activeProvider.id}-${slot.time}`}
                    type="button"
                    variant="outline"
                    className={cn(
                      "border-2 text-sm font-semibold",
                      slot.isAvailable
                        ? "text-dark-900 hover:border-primary-500 hover:text-primary-600"
                        : "border-dashed text-dark-400 line-through",
                      isSelected ? "border-primary-500 bg-primary-50 text-primary-600" : "",
                    )}
                    disabled={!slot.isAvailable}
                    onClick={() => handleSlotSelection(slot.time, slot.isAvailable)}
                  >
                    {slot.time}
                  </Button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-dark-300 p-6 text-center text-dark-500">
            Select a provider to view their availability.
          </div>
        )}
      </div>
    </section>
  );
};

export default TimeSlotPicker;
