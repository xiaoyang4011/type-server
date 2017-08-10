import { Service } from "typedi";
import { Repository, FindOptions } from "typeorm";
import { OrmRepository } from "typeorm-typedi-extensions";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { Article } from "../entities/Article";

@Service()
export class ArticleService {
	@OrmRepository(Article)
	private ArticleRepository: Repository<Article>;

	async insert(article: Article): Promise<Article> {
		return await this.ArticleRepository.persist(article);
	}
}
