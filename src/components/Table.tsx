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
		<div className='w-full p-3'>
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<th
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
										<td key={cell.id}>
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
