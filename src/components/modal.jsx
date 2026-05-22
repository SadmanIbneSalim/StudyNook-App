"use client";

import { CloudArrowUpIn, PencilToSquare, Plus } from "@gravity-ui/icons";
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
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const amenityOptions = [
  { label: "Whiteboard", value: "Whiteboard" },
  { label: "Projector", value: "Projector" },
  { label: "Wi-Fi", value: "Wi-Fi" },
  { label: "Power Outlets", value: "Power Outlets" },
  { label: "Quiet Zone", value: "Quiet Zone" },
  { label: "Air Conditioning", value: "Air Conditioning" },
];

export function ModalForm({ data }) {
  const [amenities, setAmenities] = useState(data?.amenities || []);

 const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.currentTarget));
  const newRoom = { ...formData, amenities };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${data._id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newRoom),
    });
    const result = await res.json();
    console.log("Updated:", result);
    toast.success("Room updated successfully!")
} catch (err) {
    console.error("Update failed:", err);
     toast.error("Failed to update room.")
}
redirect(`/rooms/${data._id}`)
};

  return (
    <Modal>
      <Button variant="outline">Edit</Button>
      <Modal.Backdrop
        className="bg-linear-to-t from-black/80 via-black/40 to-transparent dark:from-zinc-800/80 dark:via-zinc-800/40"
        variant="blur"
      >
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-2xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <PencilToSquare className="size-5" />
              </Modal.Icon>
              <Modal.Heading className="text-2xl">Edit </Modal.Heading>
              <p className="mt-1.5 leading-5 text-lg text-muted">
                Update your information
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <Form
                  onSubmit={handleSubmit}
                  className="w-full  bg-white rounded-3xl"
                >
                  <Fieldset className="w-full">
                    {/* ── Header ── */}

                    <FieldGroup className="mt-6 flex flex-col gap-5">
                      {/* Room Name */}
                      <TextField
                        defaultValue={data.name}
                        type="text"
                        name="name"
                        validate={(value) =>
                          value.length < 3
                            ? "Name must be at least 3 characters"
                            : null
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
                        defaultValue={data.description}
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
                      <TextField
                        name="image"
                        defaultValue={data.image}
                        type="url"
                        className="w-full"
                      >
                        <Label className="text-sm font-medium text-[#3B2F1E]">
                          Image URL
                        </Label>
                        <Input
                          placeholder="https://example.com/room.jpg"
                          className="bg-white border border-[#7A5C38] rounded-lg px-3 py-2 text-sm text-[#3B2F1E] placeholder:text-[#B0A898] w-full outline-none"
                        />
                        <FieldError className="text-xs text-[#8B3A2A] mt-1" />
                      </TextField>

                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Floor */}
                        <TextField
                          name="floor"
                          defaultValue={data.floor}
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
                          name="capacity"
                          defaultValue={data.capacity}
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
                          defaultValue={data.rate}
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
                                    ? "border-[#5a4a38] bg-[#C9A96E] text-white"
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
                        <CloudArrowUpIn></CloudArrowUpIn>
                        Update
                      </Button>
                    </Fieldset.Actions>
                  </Fieldset>
                </Form>
              </Surface>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
