import {observable,computed,runInAction} from 'mobx';

export default class PageList {

    constructor() {
        setImmediate(() => {
            this.refresh();
        });
    }

    @observable
    isFetching = true;

    @observable
    isFreshing = false;

    @observable
    data = [];

    @observable
    count = -1;

    @computed
    get isOver() {
        return this.count >= 0 && this.data.length >= this.count;
    }

    refresh = () => {
        this.isFreshing = true;
        return this.fetch(true);
    }

    fetchMore = () => this.fetch();

    async fetch(fresh = false) {
        if ((!fresh && this.isFreshing) || this.isOver) {
            return;
        }

        const skip = fresh ? 0 : this.data.length;
        this.isFetching = true;

        const {count, results} = await this.fetchData(skip);

        runInAction(() => {
            this.count = count;
            if (fresh) {
                this.data.replace(results);
            } else if (skip == this.data.length) {
                this.data.splice(this.data.length, 0, ...results);
            }

            this.isFetching = false;
            this.isFreshing = false;
        });
    }

    fetchData() {
        return {
            count: 0,
            results: []
        };
    }
}