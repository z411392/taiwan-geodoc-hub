.PHONY: dev lint format test tree

dev:
	@npm run dev -- --turbopack

lint:
	@npm run lint

format:
	@npx prettier --write .

test:
	@npx jest \
		--forceExit \
		--detectOpenHandles \
		--passWithNoTests \
		-t "ListTenants"

tree:
	@tree -I 'node_modules|.next|lib|auth|tests' .