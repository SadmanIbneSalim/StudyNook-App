"use client";

import { Plus } from "@gravity-ui/icons";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import React, { useState } from "react";

const amenityOptions = [
  { label: "Whiteboard", value: "Whiteboard" },
  { label: "Projector", value: "Projector" },
  { label: "Wi-Fi", value: "Wi-Fi" },
  { label: "Power Outlets", value: "Power Outlets" },
  { label: "Quiet Zone", value: "Quiet Zone" },
  { label: "Air Conditioning", value: "Air Conditioning" },
];

const AddRoom = () => {
  const [amenities, setAmenities] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const newRoom = { ...data, amenities };
    console.log("Room payload:", newRoom);
    // TODO: POST to /api/rooms

    const res = await fetch(`http://localhost:2001/rooms`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newRoom),
    });
    const roomData = await res.json();
    console.log(roomData);
  };

  return (
    <div className="bg-[#F5EDD8] min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 md:px-8">
        <Form
          className="w-full mx-auto max-w-2xl p-10 bg-white rounded-3xl"
          onSubmit={handleSubmit}
        >
          <Fieldset className="w-full">
            {/* ── Header ── */}
            <Fieldset.Legend className="text-3xl md:text-4xl font-bold font-serif text-[#3B2F1E]">
              Add a New Room
            </Fieldset.Legend>
            <Description className="text-[#7A5C38] text-sm mt-1 mb-2">
              Fill in the details below to list your study room on StudyNook.
            </Description>

            <FieldGroup className="mt-6 flex flex-col gap-5">
              {/* Room Name */}
              <TextField
                isRequired
                type="text"
                name="name"
                validate={(value) =>
                  value.length < 3 ? "Name must be at least 3 characters" : null
                }
                className="w-full"
              >
                <Label className="text-sm font-medium text-[#3B2F1E]">
                  Room Name
                </Label>
                <Input
                  placeholder="e.g. Silent Reading Room A"
                  className="bg-white border border-[#7A5C38]  rounded-lg px-3 py-2 text-sm text-[#3B2F1E] placeholder:text-[#B0A898] w-full outline-none"
                />
                <FieldError className="text-xs text-[#8B3A2A] mt-1" />
              </TextField>

              {/* Description */}
              <TextField
                isRequired
                name="description"
                validate={(value) =>
                  value.length < 10
                    ? "Description must be at least 10 characters"
                    : null
                }
                className="w-full"
              >
                <Label className="text-sm font-medium text-[#3B2F1E]">
                  Description
                </Label>
                <TextArea
                  placeholder="Tell us about your room — vibe, rules, best use..."
                  rows={3}
                  className="bg-white border border-[#7A5C38]  rounded-lg px-3 py-2 text-sm text-[#3B2F1E] placeholder:text-[#B0A898] w-full  resize-none"
                />
                <Description className="text-xs text-[#B0A898] mt-1">
                  Minimum 10 characters
                </Description>
                <FieldError className="text-xs text-[#8B3A2A] mt-1" />
              </TextField>

              {/* Image URL */}
              <TextField isRequired name="image" type="url" className="w-full">
                <Label className="text-sm font-medium text-[#3B2F1E]">
                  Image URL
                </Label>
                <Input
                  placeholder="https://example.com/room.jpg"
                  className="bg-white border border-[#7A5C38] rounded-lg px-3 py-2 text-sm text-[#3B2F1E] placeholder:text-[#B0A898] w-full outline-none"
                />
                <FieldError className="text-xs text-[#8B3A2A] mt-1" />
              </TextField>

              {/* Floor · Capacity · Hourly Rate — 3-col grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Floor */}
                <TextField
                  isRequired
                  name="floor"
                  type="text"
                  className="w-full"
                >
                  <Label className="text-sm font-medium text-[#3B2F1E]">
                    Floor
                  </Label>
                  <Input
                    placeholder="e.g. 3rd Floor"
                    className="bg-white border border-[#7A5C38] focus:border-[#C9A96E] rounded-lg px-3 py-2 text-sm text-[#3B2F1E] placeholder:text-[#B0A898] w-full outline-none"
                  />
                  <FieldError className="text-xs text-[#8B3A2A] mt-1" />
                </TextField>

                {/* Capacity */}
                <TextField
                  isRequired
                  name="capacity"
                  type="number"
                  validate={(value) =>
                    Number(value) < 1 ? "Must be at least 1" : null
                  }
                  className="w-full"
                >
                  <Label className="text-sm font-medium text-[#3B2F1E]">
                    Seat Capacity
                  </Label>
                  <Input
                    placeholder="e.g. 4"
                    min={1}
                    className="bg-white border border-[#7A5C38]  rounded-lg px-3 py-2 text-sm text-[#3B2F1E] placeholder:text-[#B0A898] w-full outline-none"
                  />
                  <FieldError className="text-xs text-[#8B3A2A] mt-1" />
                </TextField>

                {/* Hourly Rate */}
                <TextField
                  isRequired
                  name="rate"
                  type="number"
                  validate={(value) =>
                    Number(value) < 0 ? "Rate cannot be negative" : null
                  }
                  className="w-full"
                >
                  <Label className="text-sm font-medium text-[#3B2F1E]">
                    Hourly Rate ($)
                  </Label>
                  <Input
                    placeholder="e.g. 5"
                    min={0}
                    className="bg-white border border-[#7A5C38] focus:border-[#C9A96E] rounded-lg px-3 py-2 text-sm text-[#3B2F1E] placeholder:text-[#B0A898] w-full outline-none"
                  />
                  <FieldError className="text-xs text-[#8B3A2A] mt-1" />
                </TextField>
              </div>

              {/* Amenities */}
              <div className="flex flex-col gap-3">
                <Label className="text-sm font-medium text-[#3B2F1E]">
                  Amenities
                </Label>
                <Description className="text-xs text-[#B0A898] -mt-1">
                  Select everything available in this room
                </Description>

                <CheckboxGroup
                  value={amenities}
                  onChange={setAmenities}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                >
                  {amenityOptions.map((a) => {
                    const checked = amenities.includes(a.value);
                    return (
                      <label
                        key={a.value}
                        className={`flex items-center gap-2 border rounded-xl px-4 py-3 cursor-pointer transition-all select-none text-sm font-medium ${
                          checked
                            ? "border-[#C9A96E] bg-[#C9A96E] text-white"
                            : "border-[#d1c8b0] bg-white text-[#7A5C38] hover:border-[#C9A96E]/60"
                        }`}
                      >
                        <Checkbox value={a.value} />
                        {a.label}
                      </label>
                    );
                  })}
                </CheckboxGroup>
              </div>
            </FieldGroup>

            {/* ── Actions ── */}
            <Fieldset.Actions className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button
                type="reset"
                variant="secondary"
                onPress={() => setAmenities([])}
                className="border border-[#3B2F1E] text-[#3B2F1E] bg-transparent rounded-full px-8 py-2 font-semibold text-sm hover:bg-[#EDE8DF] transition-colors"
              >
                clear
              </Button>
              <Button
                type="submit"
                className="bg-[#3B2F1E] text-[#F5EDD8] rounded-full px-8 py-2 font-semibold text-sm hover:bg-[#4e3d28] transition-colors flex items-center gap-2"
              >
                <Plus></Plus>
                Add Room
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </div>
    </div>
  );
};

export default AddRoom;
