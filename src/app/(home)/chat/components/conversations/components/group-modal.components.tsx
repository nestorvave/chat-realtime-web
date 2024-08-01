import { Modal } from "@/app/components/modal/modal.component";
import { MultipleSelect } from "@/app/components/multiple-select/multiple-select.component";
import TextInput from "@/app/components/text-input/text-input.component";
import { useGetUsers } from "@/app/hooks/useGetUsers";
import React, { Dispatch, SetStateAction } from "react";

interface IGroupModal {
  createRoom: () => void;
  group: { users: string[]; name: string };
  setGroup: React.Dispatch<
    React.SetStateAction<{ users: string[]; name: string }>
  >;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GroupModal = ({
  createRoom,
  group,
  setGroup,
  open,
  setOpen,
}: IGroupModal) => {
  const users = useGetUsers();

  return (
    <Modal
      title="Create a group chat"
      subtitle="Create a chat with more than 2 people."
      onClose={() => setOpen(false)}
      onSave={createRoom}
      open={open}
    >
      <div className="flex flex-col gap-6 px-4 pb-8">
        <TextInput
          value={group.name}
          isRequired
          id="groupName"
          label="Group name"
          name="groupName"
          type="text"
          onChange={(e) => setGroup({ ...group, name: e.target.value })}
          placeholder=""
        />
      </div>
      <div className="flex flex-col gap-6 px-4 pb-8">
        <MultipleSelect users={users} group={group} setGroup={setGroup} />
      </div>
    </Modal>
  );
};
