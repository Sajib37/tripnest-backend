/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T>{
    public modelQuery: Query<T[], T>
    public query: Record<string, unknown>
    
    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery,
        this.query= query
    }

    // searching by serachterm string
    search(searchableFields: string[]) {
        if (this?.query?.searchTerm) {
           const searchTerm: string= this?.query?.searchTerm as string || ""
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" },
                }) as FilterQuery<T>),
            });
        }
        return this;
    }


    // filterQuery
    filter() {
        const queryObj: Record<string, unknown> = {
            ...this.query
        }
        const excludeFields: string[] = ["searchTerm","sort","limit","page","fields"]
        excludeFields.map(el => delete queryObj[el]) //delet the elements from queryObj which are in exclude fields

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)
        return this
    }

    // sorting
    sort() {
        const sort: string = this.query?.sort as string || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort)
        return this
    }

    // paginating
    paginate() {
        const limit: number = Number(this.query?.limit)|| 25;
        const page: number = Number(this.query?.page)|| 1;
        const skip: number = (page-1)*limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit)
        
        return this;
    }

    fields() {
        const fields = (this.query?.fields as string)?.split(",").join(" ") || "-__v"
        this.modelQuery = this.modelQuery.select(fields)

        return this;
    }

    async countTotal() {
        const totalQueries = this.modelQuery.getFilter();
        const total = await this.modelQuery.model.countDocuments(totalQueries);
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 10;
        const totalPage = Math.ceil(total / limit);
    
        return {
          page,
          limit,
          total,
          totalPage,
        };
      }
}

export default QueryBuilder;