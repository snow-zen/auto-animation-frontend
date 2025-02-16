import { useState } from "react"

import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { MultiStepNav } from "~/tasks/add/components/multi-step-nav"

const total_steps = [
  {
    title: "抓取元数据",
    type: "FETCH_INFO",
  },
  {
    title: "修改元数据",
    type: "MODIFY_META_INFO",
  },
]

export default function AddTaskPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [complete, setComplete] = useState(false)

  function nextStep() {
    setCurrentStepIndex(currentStepIndex + 1)
    if (currentStepIndex >= total_steps.length - 1) {
      setComplete(true)
    }
  }

  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">添加任务</h2>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <MultiStepNav currentStepIndex={currentStepIndex} steps={total_steps} />
          {complete ? (
            <h3 className="text-lg font-medium">任务提交完成</h3>
          ) : (
            <main className={`"w-full md:w-[65%]"} md:mt-5`}>
              <h3 className="text-lg font-medium">Page {total_steps[currentStepIndex]?.title}</h3>
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <div className="after:shadow-highlight relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-white/10 after:transition focus-within:after:shadow-[#77f6aa]">
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="relative rounded-xl border border-black/20 bg-neutral-900 text-neutral-200 shadow-black/10 shadow-input hover:text-white"
                    >
                      {currentStepIndex >= total_steps.length - 1 ? "完成" : "下一步"}
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          )}
        </div>
      </div>
    </>
  )
}
