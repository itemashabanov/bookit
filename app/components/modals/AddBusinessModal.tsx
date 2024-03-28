'use client';

import useAddBusinessModal from "@/app/hooks/useAddBusinessModal";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import Counter from "../inputs/Counter";
import LocationSelect from "../inputs/LocationSelect";
import { categories } from "../navbar/Categories";
import Modal from "./Modal";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const AddBusinessModal = () => {
  const addBusinessModal = useAddBusinessModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
      workersCount: 1,
    }
  });

  const category = watch('category');
  const location = watch('location');
  const workersCount = watch('workersCount');

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false,
  }), [location]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Add";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div
      className="
        flex
        flex-col
        gap-8
      "
    >
      <Heading
        title="What of these does describe your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Where is your place located"
          subtitle="Let clients find you"
        />
        <LocationSelect
          onChange={(value) => setCustomValue('location', value)}
          value={location}
        />
        <Map
          center={location?.latlng}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Provide some info about your business"
          subtitle="What service do you provide?"
        />
        <Counter
          title="Number of workers"
          subtitle="Number of workers"
          value={workersCount}
          onChange={(value) => setCustomValue('workersCount', value)}
        />
      </div>
    );
  }
  
  return (
    <Modal
      isOpen={addBusinessModal.isOpen}
      onClose={addBusinessModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Add your Business"
      body={bodyContent}
    />
  );
}
 
export default AddBusinessModal;