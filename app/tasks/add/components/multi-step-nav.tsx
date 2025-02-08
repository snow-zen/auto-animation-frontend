import { Circle, CircleCheckBig } from "lucide-react"

interface MultiStepNavProps {
  currentStepIndex: number
  steps: {
    title: string
    type: string
  }[]
}

export function MultiStepNav({ currentStepIndex, steps }: MultiStepNavProps) {
  return (
    <div className="absolute -top-20 left-0 w-full md:relative md:left-0 md:top-0 md:w-[25%]">
      <nav className="h-full rounded-md py-5">
        <ul className="flex justify-center gap-2 md:flex-col">
          {steps.map((it, idx) => (
            <li key={it.type} className="flex items-center pb-1.5 font-medium">
              {currentStepIndex > idx ? (
                <CircleCheckBig className="mr-2 h-4 w-4 text-sm text-green-500" />
              ) : (
                <Circle className="mr-2 h-4 w-4 text-sm text-neutral-500" />
              )}
              <span className={`text-sm ${currentStepIndex === idx ? "text-black" : "text-neutral-500"} md:text-base`}>
                {it.title}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
