import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DynamicTableInterface } from 'src/app/interfaces/dynamic-table.interface';
import { TableHeaderInterface } from 'src/app/interfaces/table-header.interface';

@Component({
	selector: 'app-datatable',
	templateUrl: './datatable.component.html',
})

export class DatatableComponent implements OnInit {

    public tableHeaders: TableHeaderInterface[];
    public tableData: DynamicTableInterface;
	public dragTrace: { src: number, dest: number, };

	constructor(
		private changeDetector: ChangeDetectorRef,
	) {

	}

	ngOnInit(): void {
		
		this.tableData = { 
			headers: [],
			data: [],
		};
	}

	public render(headers: TableHeaderInterface[], data: any[]) {

		this.tableData = {
			headers: headers.filter(x => x.isSelected),
			data: data,
		};

		this.tableHeaders = headers;
		this.resetDragTracer();
		this.changeDetector.detectChanges();
	}

	private resetDragTracer() {

		this.dragTrace = { src: -1, dest: -1, };
	}
}
