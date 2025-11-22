# Security Guidelines

## Environment Variables & Secrets

### Never Commit Sensitive Data

The following files contain sensitive information and should **NEVER** be committed to version control:
- `.env` files (all variations)
- `.env.local`
- `.env.*.local`
- Credential files
- API keys
- Database passwords

### How We Protect Secrets

1. **Git Configuration**: All `.env` files are listed in `.gitignore` to prevent accidental commits
2. **Version Control Cleanup**: Any previously committed `.env` files have been removed from git history
3. **Templates**: `.env.example` files serve as templates showing what variables are needed (with placeholder values)

### Setting Up Local Environment

1. Copy the `.env.example` to `.env`:
   ```bash
   cp Node/.env.example Node/.env
   cp React/.env.example React/.env.local
   ```

2. Edit the new `.env` files with your actual credentials:
   ```bash
   # Node/.env
   DB_HOST=your-actual-rds-endpoint
   DB_USER=your-actual-username
   DB_PASSWORD=your-actual-password
   ```

### Deployment Environments

**Vercel (Frontend)**
- Set `REACT_APP_API` in Vercel project settings → Environment Variables
- Never paste `.env` file contents into Vercel

**Render (Backend)**
- Set environment variables in Render dashboard → Environment
- Add: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`, `NODE_ENV`
- Never expose credentials in version control

### Checking for Exposed Secrets

If you accidentally commit secrets, take these steps immediately:

1. Remove from git history:
   ```bash
   git rm --cached .env
   git commit -m "Remove accidentally committed .env file"
   git push origin main
   ```

2. **IMPORTANT**: Rotate/reset all exposed credentials:
   - Change database password
   - Regenerate API keys
   - Update AWS access keys if needed

3. Force-update git history (if absolutely necessary):
   ```bash
   git filter-branch --tree-filter 'rm -f .env' HEAD
   git push origin main --force
   ```

## Best Practices

✅ **DO:**
- Use `.env.example` as a template
- Store actual credentials in local `.env` files (git-ignored)
- Use platform-specific secret managers (Vercel, Render dashboards)
- Rotate credentials regularly
- Review `.gitignore` before committing

❌ **DON'T:**
- Commit `.env` files with real credentials
- Paste credentials in code or comments
- Share credentials via email or chat
- Use the same password for multiple services
- Commit API keys or database passwords

## Additional Security Measures

- Enable two-factor authentication on AWS, GitHub, Vercel, and Render
- Regularly audit git history for exposed secrets using `git log -p`
- Use managed secrets services for production (AWS Secrets Manager, HashiCorp Vault)
- Implement principle of least privilege (minimal database user permissions)
- Keep Node.js and npm dependencies updated

## Emergency: Exposed Credentials

If you suspect credentials have been exposed:

1. **Immediately** reset the password/key
2. Remove from git history
3. Push the cleanup commit
4. Notify team members
5. Audit access logs for suspicious activity
