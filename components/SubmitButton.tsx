import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

interface ButtonProps {
  isloading: boolean
  className?: string
  children: React.ReactNode
}

const SubmitButton = ({ isloading, className, children }: ButtonProps) => {
  return (
    <Button
        className={className ?? 'shad-primary-btn w-full'}
        type="submit"
        disabled={isloading}
    >
        {isloading ? (
            <div className="flex items-center gap-4">
                    <Image
                        src="/assets/icons/loader.svg"
                        width={24}
                        height={24}
                        alt="loading"
                        className="animate-spin"
                    />
                    Loading...
            </div>
        ): children}
    </Button>
  )
}

export default SubmitButton
