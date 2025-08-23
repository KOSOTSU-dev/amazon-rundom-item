"use client";
import * as Slider from "@radix-ui/react-slider";
import { useEffect, useState } from "react";

interface PriceSliderProps {
	minPrice: number;
	maxPrice: number;
	onChange: (min: number, max: number) => void;
}

export default function PriceSlider({ minPrice, maxPrice, onChange }: PriceSliderProps) {
	const [values, setValues] = useState<[number, number]>([minPrice, maxPrice]);

	const priceRange = { min: 1, max: 100000, step: 100 } as const;

	useEffect(() => {
		setValues([minPrice, maxPrice]);
	}, [minPrice, maxPrice]);

	const handleChange = (v: number[]) => {
		if (v.length === 2) {
			const [min, max] = v as [number, number];
			setValues([min, max]);
			onChange(min, max);
		}
	};

	return (
		<div className="w-full">
			<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
				<div className="mb-4">
					<h3 className="text-lg font-bold text-gray-900 mb-2">価格</h3>
					<div className="text-2xl font-bold text-gray-900">
						¥{values[0].toLocaleString()} - {values[1] >= 100000 ? "上限なし" : `¥${values[1].toLocaleString()}`}
					</div>
				</div>

				<Slider.Root
					className="relative flex items-center select-none touch-none w-full h-6"
					min={priceRange.min}
					max={priceRange.max}
					step={priceRange.step}
					value={values}
					onValueChange={handleChange}
					aria-label="Price range"
				>
					{/* Track */}
					<Slider.Track className="relative h-2 w-full rounded-full bg-gray-200">
						<Slider.Range className="absolute h-full rounded-full bg-[#FFA41C]" />
					</Slider.Track>

					{/* Thumbs */}
					<Slider.Thumb
						className="block w-5 h-5 bg-[#FFA41C] border-2 border-white rounded-full shadow-md hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF9900]"
						aria-label="Minimum price"
					/>
					<Slider.Thumb
						className="block w-5 h-5 bg-[#FFA41C] border-2 border-white rounded-full shadow-md hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF9900]"
						aria-label="Maximum price"
					/>
				</Slider.Root>
			</div>
		</div>
	);
} 