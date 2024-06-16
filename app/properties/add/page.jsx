import React from 'react';
import PropertyAddForm from '@/components/PropertyAddForm';

const AddingPropertyPage = () => {
  return (
    <section className="bg-blue-50 dark:bg-[#121212]">
      <div className="container m-auto max-w-2xl py-8 xl:py-24">
        <div className="bg-white dark:bg-[#1f2937] px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};

export default AddingPropertyPage;
