import type { BaseFieldProps } from '@/types/baseProps';

import cl from './FieldColor.module.scss';
import FieldBase from '../fieldBase/FieldBase';
import VisuallyHiddenLoader from '@/components/visuallyHiddenLoader/VisuallyHiddenLoader';
import Skeleton from 'react-loading-skeleton';

import { forwardRef, useId } from 'react';
import { SketchPicker } from 'react-color';

type FieldColorProps = BaseFieldProps & {
	value: string;
	onChange: (color: string) => void;
};

const FieldColor = forwardRef<HTMLInputElement, FieldColorProps>(
	({ isLoading = false, isSkeleton, value, onChange, ...props }, ref) => {
		const pickerId = useId();

		return (
			<div className={cl['field-wrapper']}>
				<FieldBase
					ref={ref}
					value={value}
					isVisuallyHiddenLabel={false}
					isLoading={isLoading}
					isSkeleton={isSkeleton}
					aria-controls={pickerId}
					readOnly={true}
					autoComplete="none"
					className={{ field: cl.field, skeleton: cl['skeleton-field'] }}
					{...props}
				>
					<div
						className={cl.selected}
						style={{ backgroundColor: `${value}` }}
						aria-hidden={true}
					></div>
				</FieldBase>

				<div id={pickerId} aria-label="Выбор цвета">
					<VisuallyHiddenLoader isLoading={isLoading}>
						{isSkeleton ? (
							<Skeleton className={cl['skeleton-picker']} />
						) : (
							<SketchPicker
								color={String(value)}
								disableAlpha={true}
								onChange={(color) => onChange(color.hex)}
								presetColors={[
									'#76DE37',
									'#417505',
									'#D0021B',
									'#F5A623',
									'#F8E71C',
									'#8B572A',
									'#BD10E0',
									'#9013FE',
									'#4A90E2',
									'#50E3C2',
									'#9B9B9B',
								]}
								styles={{
									default: {
										color: {
											display: 'none',
										},
										saturation: {
											paddingBottom: '40%',
										},
									},
								}}
							/>
						)}
					</VisuallyHiddenLoader>
				</div>
			</div>
		);
	},
);

export default FieldColor;
