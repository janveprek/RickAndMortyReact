enum StatusFilter {
    All,
    Alive,
    Dead,
    Unknown,
}

namespace StatusFilter {
    export function getName(filter: StatusFilter): string {
        switch (filter) {
            case StatusFilter.All:
                return 'all';
            case StatusFilter.Alive:
                return 'alive';
            case StatusFilter.Dead:
                return 'dead';
            case StatusFilter.Unknown:
                return 'unknown';
            default:
                return '';
        }
    }

    export function getApiName(filter: StatusFilter): string {
        switch (filter) {
            case StatusFilter.All:
                return '';
            case StatusFilter.Alive:
                return 'alive';
            case StatusFilter.Dead:
                return 'dead';
            case StatusFilter.Unknown:
                return 'unknown';
            default:
                return '';
        }
    }
}

export default StatusFilter;
