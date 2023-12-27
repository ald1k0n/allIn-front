import {
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	flexRender,
} from '@tanstack/react-table';
import { useState, FC, useMemo } from 'react';

interface IProps {
	data: Array<any>;
	columns: Array<any>;
}

export const Table: FC<IProps> = ({ data = [], columns = [] }) => {
	const [sorting, setSorting] = useState<SortingState>([]);

	const cols = useMemo(() => columns, [columns]);

	const table = useReactTable({
		data,
		columns: cols,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div className='w-full p-3 overflow-auto'>
			<table className='w-full border'>
				<thead className='bg-gray-300'>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<th
										className='px-2.5 py-2 border'
										key={header.id}
										colSpan={header.colSpan}>
										{header.isPlaceholder ? null : (
											<div
												{...{
													className: 'cursor-pointer',
													onClick: header.column.getToggleSortingHandler(),
												}}>
												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
											</div>
										)}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => {
						return (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => {
									return (
										<td
											className='text-center border py-1.5 px-2'
											key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
