"use client";

// External dependencies
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Internal UI components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";

/**
 * Props interface for Breadcrumbs component
 * @interface BreadcrumbsProps
 * @property {string} [homeHref] - URL for the home link, defaults to "/dashboard"
 * @property {string} [homeLabel] - Label for the home link, defaults to "Home"
 * @property {boolean} [showHome] - Whether to show the home link, defaults to true
 * @property {string} [className] - Optional CSS class name for additional styling
 */
interface BreadcrumbsProps {
  homeHref?: string;
  homeLabel?: string;
  showHome?: boolean;
  className?: string;
}

/**
 * Breadcrumbs Component
 * Displays a navigation breadcrumb trail based on the current route
 *
 * @component
 * @example
 * ```tsx
 * <Breadcrumbs
 *   homeHref="/dashboard"
 *   homeLabel="Dashboard"
 * />
 * ```
 */
export function Breadcrumbs({
  homeHref = "/dashboard",
  homeLabel = "Home",
  showHome = true,
  className,
}: BreadcrumbsProps) {
  const breadcrumbs = useBreadcrumbs();

  // Don't render anything if there are no breadcrumbs
  if (breadcrumbs.length === 0) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList aria-label="Navigation breadcrumbs">
        {/* Optional Home link */}
        {showHome && (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={homeHref}>{homeLabel}</Link>
            </BreadcrumbLink>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </BreadcrumbItem>
        )}

        {/* Dynamic breadcrumbs */}
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem key={`${crumb.href}-${index}`}>
            {!crumb.isCurrent ? (
              <>
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </BreadcrumbLink>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </>
            ) : (
              <BreadcrumbPage aria-current="page">{crumb.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
