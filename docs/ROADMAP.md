# Roadmap: Luna self-hosted + admin controls

## Phase 1: Foundation (this scaffold)

- [x] Repository layout for app/docs/infra
- [x] Admin API with token-gated endpoints
- [x] XP rate update endpoint
- [x] Spawn item endpoint
- [x] Adapter boundary for Luna integration

## Phase 2: Real game integration

- [ ] Fork/sync `luna-rs/luna` into `services/luna` or maintain as submodule
- [ ] Decide integration mode:
  - direct Rust module calls
  - gRPC/HTTP admin service in Luna runtime
  - message queue + worker bridge
- [ ] Replace stub adapter with real commands
- [ ] Add audit logs for every admin action

## Phase 3: Persistence + auth hardening

- [ ] Postgres-backed config store (xpRate, events)
- [ ] Spawn-item command queue table
- [ ] JWT or session-based auth with role permissions
- [ ] Rotate admin secrets via env/secret manager

## Phase 4: Operator UX

- [ ] Lightweight admin dashboard UI
- [ ] Action history and rollback flows
- [ ] Rate-limited privileged operations
- [ ] Live metrics and alerts

## Phase 5: Production-ready hosting

- [ ] Containerize all services
- [ ] Add CI checks and deployment automation
- [ ] TLS, backups, and disaster recovery docs
