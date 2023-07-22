import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createTask } from '../../../services/operations/taskAPI';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MultiSelect from '../../common/multiSelect';

const CreateTask = () => {
  const { handleSubmit, control, register, formState: { errors, isSubmitSuccessful } } = useForm();
  const {token} = useSelector((state) => state.auth)
  const{userlist}= useSelector((state) => state.profile)
  const dispatch = useDispatch()


  const onSubmit = (data) => {
    const formattedDueDate = new Date(data.dueDate).toISOString();
    console.log('Formatted Due Date:', formattedDueDate);
    const formattedData = {
        ...data,
        dueDate: formattedDueDate
      };
    dispatch(createTask(formattedData,token))
  };

  return (
    <div>
      <div className="p-5">
        <h1 className="mb-14 mx-20 text-lg mt-[-24px] font-medium text-caribbeangreen-100 lg:mx-2 lg:text-2xl">
          Create Task
        </h1>
        <div className="bg-black w-[22rem] mx-auto rounded-xl lg:w-[50rem]">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-10">
            <div className="flex-col justify-between gap-1 lg:flex">
              <div className="flex flex-col">
                <label htmlFor="Title" className="text-sm text-richblack-25 font-inter font-semibold">
                  Title:
                </label>
                <input
                  className={`border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white m-1 ${
                    errors.title ? 'border-red-500' : ''
                  }`}
                  id="Title"
                  type="string"
                  name="Title"
                  placeholder="Enter title of your task"
                  {...register('Title', {
                    required: 'Please enter Title'
                  })}
                />
                {errors.Title && <span className="text-red-500 font-semibold">{errors.Title.message}</span>}
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Description" className="text-sm text-richblack-25 font-inter font-semibold">
                Description:
              </label>
              <textarea
                name="Description"
                id="Description"
                cols="30"
                rows="7"
                placeholder="Describe your task"
                className={`form-style border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white m-1 ${
                  errors.Description ? 'border-red-500' : ''
                }`}
                {...register('Description', {
                  required: 'Please enter your description',
                  maxLength: { value: 500, message: 'Description could have maximum 500 characters' }
                })}
              />
              {errors.Description && <span className="text-red-500">{errors.Description.message}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="dueDate" className="text-sm text-richblack-25 font-inter font-semibold">
                Deadline:
              </label>
              <input
                className={`border-1px border-richblack-600 rounded-md px-4 py-2 bg-richblack-600 text-white m-1 ${
                  errors.dueDate ? 'border-red-500' : ''
                }`}
                id="dueDate"
                type="Date"
                name="dueDate"
                placeholder="mm-dd-yyyy"
                {...register('dueDate', {
                  required: 'Please enter completion deadline'
                })}
              />
              {errors.dueDate && <span className="text-red-500">{errors.dueDate.message}</span>}
            </div>

            <div>
                <MultiSelect data={userlist}></MultiSelect>
            </div>

            <button
              type="submit"
              className={`border-1px border-blue-500 rounded-md px-4 py-2 bg-blue-200 text-white m-1 my-[4rem] mx-auto w-full ${
                isSubmitSuccessful ? 'cursor-not-allowed' : ''
              }`}
              disabled={isSubmitSuccessful}
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
